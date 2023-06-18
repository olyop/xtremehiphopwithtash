package com.xtremehiphopwithtash.book.service;

import com.stripe.model.PaymentIntent;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.dao.BookingDAO;
import com.xtremehiphopwithtash.book.service.inputmapper.BookingInputMapper;
import com.xtremehiphopwithtash.book.service.validator.CommonValidator;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import com.xtremehiphopwithtash.book.service.validator.StudentValidator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

	private final BookingDAO bookingDAO;
	private final BookingCostService bookingCostService;
	private final SessionService sessionService;
	private final CouponService couponService;

	private final BookingInputMapper bookingInputMapper;
	private final StudentValidator studentValidator;
	private final SessionValidator sessionValidator;
	private final CommonValidator commonValidator;

	public BookingService(
		BookingDAO bookingDAO,
		BookingCostService bookingCostService,
		SessionService sessionService,
		CouponService couponService,
		BookingInputMapper bookingInputMapper,
		StudentValidator studentValidator,
		SessionValidator sessionValidator,
		CommonValidator commonValidator
	) {
		this.bookingDAO = bookingDAO;
		this.bookingCostService = bookingCostService;
		this.sessionService = sessionService;
		this.couponService = couponService;
		this.bookingInputMapper = bookingInputMapper;
		this.studentValidator = studentValidator;
		this.sessionValidator = sessionValidator;
		this.commonValidator = commonValidator;
	}

	public Booking create(BookingInput input, String studentID) {
		return create(input, studentID, null);
	}

	public Booking create(BookingInput input, String studentID, PaymentIntent paymentIntent) {
		studentValidator.validateID(studentID);
		validateCreate(input);

		Session session = sessionService.retreiveByID(input.sessionID());
		BookingCost bookingCost = getBookingCost(input, session);

		Booking booking = bookingInputMapper.map(input);
		booking.setStudentID(studentID);

		if (isBookingFree(bookingCost, input)) {
			booking.setCost(null);
		} else if (isPayingWithCash(input)) {
			validateStudentHasNotBookedSession(studentID, input);
			validateQuantitiesAreOne(input);

			booking.setCost(bookingCost.getFinalCost());
		} else if (isPayingWithCard(input, paymentIntent)) {
			booking.setPaymentIntentID(paymentIntent.getId());
			booking.setCost(paymentIntent.getAmount().intValue());
		} else {
			throw new IllegalStateException("Invalid payment method");
		}

		Booking savedBooking = bookingDAO.insert(booking);
		UUID bookingID = savedBooking.getBookingID();

		if (input.couponCode().isPresent()) {
			couponService.use(input.couponCode().get(), studentID, bookingID);
		}

		return savedBooking;
	}

	public Booking update(UUID bookingID, BookingInput input) {
		validateUpdate(bookingID, input);

		Booking booking = bookingInputMapper.map(input);

		return bookingDAO.updateByID(bookingID, booking);
	}

	public void cancelByID(UUID bookingID, String studentID, String reCaptcha) {
		validateID(bookingID);
		studentValidator.validateID(studentID);

		Booking booking = bookingDAO.selectByID(bookingID);

		if (!booking.getStudentID().equals(studentID)) {
			throw new ResolverException("Can only cancel your own bookings");
		}

		if (booking.getPaymentMethod() != PaymentMethod.CASH) {
			throw new ResolverException("Can only cancel cash bookings");
		}

		bookingDAO.deleteByID(bookingID);
	}

	public void validateCreate(BookingInput input) {
		validateInput(input);
		validateSessionCapacity(input);
		validateCoupon(input.couponCode());
	}

	public void validateUpdate(UUID bookingID, BookingInput input) {
		validateID(bookingID);
		validateInput(input);
	}

	private void validateID(UUID bookingID) {
		if (!bookingDAO.existsByID(bookingID)) {
			throw new ResolverException("Booking does not exist");
		}
	}

	private void validateInput(BookingInput input) {
		validateSession(input.sessionID());
		commonValidator.validateText(input.notes(), "Notes", 1024);
		commonValidator.validateNonZeroInteger(input.bookingQuantity(), "Booking quantity");
		commonValidator.validateNonZeroInteger(input.equipmentQuantity(), "Equipment quantity");
	}

	private void validateSession(UUID sessionID) {
		sessionValidator.validateID(sessionID);
		sessionValidator.validateIsNotInPast(sessionService.retreiveByID(sessionID).getStartTime());
	}

	private void validateCoupon(Optional<String> couponCode) {
		if (couponCode.isPresent()) {
			String message = couponService.canUseErrorMessage(couponCode.get());
			if (message != null) {
				throw new ResolverException(message);
			}
		}
	}

	private void validateSessionCapacity(BookingInput input) {
		int capacityRemaining = retreiveCapacityRemaining(input.sessionID());
		int equipmentRemaining = retreiveEquipmentRemaining(input.sessionID());

		if (input.bookingQuantity() > capacityRemaining) {
			throw new ResolverException("No capacity remaining");
		}

		if (input.equipmentQuantity().isPresent() ? input.equipmentQuantity().get() > equipmentRemaining : false) {
			throw new ResolverException("No equipment remaining");
		}
	}

	private void validateStudentHasNotBookedSession(String studentID, BookingInput input) {
		if (bookingDAO.existsByStudentIDAndSessionID(studentID, input.sessionID())) {
			throw new ResolverException(
				"You already booked this session. When paying with cash you can only book a session once."
			);
		}
	}

	private void validateQuantitiesAreOne(BookingInput input) {
		if (
			input.bookingQuantity() != 1 &&
			(input.equipmentQuantity().isPresent() ? input.equipmentQuantity().get() != 1 : false)
		) {
			throw new ResolverException("When paying with cash you can only book one session and hire one step.");
		}
	}

	public BookingCost getBookingCost(BookingInput input, Session session) {
		Optional<Integer> couponDiscountPercentage = input.couponCode().isPresent()
			? Optional.of(couponService.getDiscount(input.couponCode().get()))
			: Optional.empty();

		return bookingCostService.getBookingCost(
			Optional.ofNullable(session.getPrice()),
			Optional.ofNullable(session.getEquipmentFee()),
			input.bookingQuantity(),
			input.equipmentQuantity(),
			input.paymentMethod(),
			input.couponCode(),
			couponDiscountPercentage
		);
	}

	private boolean isBookingFree(BookingCost bookingCost, BookingInput input) {
		if (bookingCost.getFinalCost() == 0) {
			if (input.paymentMethod().isEmpty()) {
				// Free session
				return true;
			} else if (input.paymentMethod().get().equals(PaymentMethod.COUPON) && bookingCost.isFreeFromCoupon()) {
				// Free session from coupon
				return true;
			} else {
				throw new IllegalStateException("Invalid payment method");
			}
		} else {
			return false;
		}
	}

	private boolean isPayingWithCash(BookingInput input) {
		return input.paymentMethod().isPresent() && input.paymentMethod().get() == PaymentMethod.CASH;
	}

	private boolean isPayingWithCard(BookingInput input, PaymentIntent paymentIntent) {
		return (
			input.paymentMethod().isPresent() &&
			input.paymentMethod().get() == PaymentMethod.CARD &&
			paymentIntent != null &&
			paymentIntent.getStatus().equals("succeeded")
		);
	}

	public List<Booking> retreiveAll() {
		return bookingDAO.select();
	}

	public Booking retreiveByID(UUID bookingID) {
		validateID(bookingID);

		return bookingDAO.selectByID(bookingID);
	}

	public List<Booking> retreiveByStudentID(String studentID) {
		studentValidator.validateID(studentID);

		return bookingDAO.selectByStudentID(studentID);
	}

	public int retreiveStudentTotal(String studentID) {
		return bookingDAO.selectSumByStudentID(studentID);
	}

	public List<Booking> retreiveBySessionID(UUID sessionID) {
		sessionValidator.validateID(sessionID);

		return bookingDAO.selectBySessionID(sessionID);
	}

	public int retreiveCapacityBooked(UUID sessionID) {
		sessionValidator.validateID(sessionID);

		return bookingDAO.selectCapacityBooked(sessionID);
	}

	public int retreiveCapacityRemaining(UUID sessionID) {
		sessionValidator.validateID(sessionID);

		return bookingDAO.selectCapacityRemaining(sessionID);
	}

	public boolean retreiveIsCapacityRemaining(UUID sessionID, short bookingQuantity) {
		sessionValidator.validateID(sessionID);

		return bookingDAO.selectIsCapacityRemaining(sessionID, bookingQuantity);
	}

	public int retreiveEquipmentHired(UUID sessionID) {
		sessionValidator.validateID(sessionID);

		return bookingDAO.selectEquipmentHired(sessionID);
	}

	public boolean retreiveIsEquipmentRemaining(UUID sessionID, short equipmentQuantity) {
		sessionValidator.validateID(sessionID);

		return bookingDAO.selectIsEquipmentRemaining(sessionID, equipmentQuantity);
	}

	public int retreiveEquipmentRemaining(UUID sessionID) {
		sessionValidator.validateID(sessionID);

		return bookingDAO.selectEquipmentRemaining(sessionID);
	}

	public void checkIn(UUID bookingID, boolean hasCheckedIn) {
		validateID(bookingID);

		bookingDAO.updateHasCheckedIn(bookingID, hasCheckedIn);
	}
}
