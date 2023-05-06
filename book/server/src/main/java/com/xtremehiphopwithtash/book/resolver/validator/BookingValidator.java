package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class BookingValidator implements ValidatorRUD<UUID, BookingInput> {

	private final BookingDAO bookingDAO;
	private final SessionDAO sessionDAO;
	private final CommonValidator commonValidator;
	private final SessionValidator sessionValidator;
	private final StudentValidator studentValidator;
	private final ReferralCodeValidator referralCodeValidator;

	public BookingValidator(
		BookingDAO bookingDAO,
		SessionDAO sessionDAO,
		CommonValidator commonValidator,
		SessionValidator sessionValidator,
		StudentValidator studentValidator,
		ReferralCodeValidator referralCodeValidator
	) {
		this.bookingDAO = bookingDAO;
		this.sessionDAO = sessionDAO;
		this.commonValidator = commonValidator;
		this.sessionValidator = sessionValidator;
		this.studentValidator = studentValidator;
		this.referralCodeValidator = referralCodeValidator;
	}

	public void validateCreateWithReferralCode(BookingInput input, String studentID, String code) {
		validateCreate(input, studentID);
		referralCodeValidator.validateText(code);
		referralCodeValidator.validateID(code);
		referralCodeValidator.validateCodeNotUsed(code);
	}

	public void validateCreateFree(BookingInput input, String studentID) {
		validateCreate(input, studentID);
	}

	public boolean isEquipmentAvailable(UUID sessionID) {
		Session session = sessionDAO.selectByID(sessionID).get();
		short equipmentAvailable = session.getEquipmentAvailable();
		short equipmentUsed = bookingDAO.selectCountBySessionIDAndBringingOwnEquipment(sessionID);

		return (equipmentAvailable - equipmentUsed) > 0;
	}

	@Override
	public void validateUpdate(UUID bookingID, BookingInput input) {
		validateID(bookingID);
		validateInput(input);
		sessionValidator.validateID(input.sessionID());
		Booking booking = bookingDAO.selectByID(bookingID).get();
		Session session = sessionDAO.selectByID(booking.getSessionID()).get();
		sessionValidator.validateIsNotInPast(session.getStartTime());
	}

	@Override
	public void validateDelete(UUID bookingID) {
		validateID(bookingID);
		Booking booking = bookingDAO.selectByID(bookingID).get();
		Session session = sessionDAO.selectByID(booking.getSessionID()).get();
		sessionValidator.validateIsNotInPast(session.getStartTime());
	}

	@Override
	public void validateID(UUID bookingID) {
		if (!bookingDAO.existsByID(bookingID)) {
			throw new ResolverException("Booking does not exist");
		}
	}

	@Override
	public void validateInput(BookingInput input) {
		commonValidator.validateText(input.notes(), "Notes", 1024);
		sessionValidator.validateID(input.sessionID());
		checkThereIsCapacity(input);
		checkThereIsEquipmentAvailable(input);
	}

	private void validateCreate(BookingInput input, String studentID) {
		sessionValidator.validateID(input.sessionID());
		studentValidator.validateID(studentID);
		validateInput(input);
		checkStudentHasNotBookedSession(input, studentID);
	}

	private void checkStudentHasNotBookedSession(BookingInput input, String studentID) {
		if (bookingDAO.existsByStudentAndSession(studentID, input.sessionID())) {
			throw new ResolverException("You have already booked for this session");
		}
	}

	private void checkThereIsEquipmentAvailable(BookingInput input) {
		if (!input.isBringingOwnEquipment()) {
			if (!isEquipmentAvailable(input.sessionID())) {
				throw new ResolverException("No equipment available");
			}
		}
	}

	private void checkThereIsCapacity(BookingInput input) {
		Session session = sessionDAO.selectByID(input.sessionID()).get();
		Short capacity = session.getCapacity();
		Short bookings = bookingDAO.selectCountBySessionID(input.sessionID());

		if ((capacity - bookings) <= 0) {
			throw new ResolverException("No capacity available");
		}
	}
}
