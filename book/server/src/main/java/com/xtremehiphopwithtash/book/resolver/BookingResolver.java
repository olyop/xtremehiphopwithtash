package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.ReferralCodeDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.dao.StudentDAO;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.ReferralCode;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.resolver.mapper.BookingInputMapper;
import com.xtremehiphopwithtash.book.resolver.validator.BookingValidator;
import com.xtremehiphopwithtash.book.resolver.validator.ReferralCodeValidator;
import com.xtremehiphopwithtash.book.resolver.validator.SessionValidator;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class BookingResolver {

	private final BookingInputMapper bookingInputMapper;
	private final BookingDAO bookingDAO;
	private final SessionDAO sessionDAO;
	private final StudentDAO studentDAO;
	private final ReferralCodeDAO referralCodeDAO;
	private final BookingValidator bookingValidator;
	private final SessionValidator sessionValidator;
	private final ReferralCodeValidator referralCodeValidator;

	public BookingResolver(
		BookingInputMapper bookingInputMapper,
		BookingDAO bookingDAO,
		SessionDAO sessionDAO,
		StudentDAO studentDAO,
		ReferralCodeDAO referralCodeDAO,
		BookingValidator bookingValidator,
		SessionValidator sessionValidator,
		ReferralCodeValidator referralCodeValidator
	) {
		this.bookingInputMapper = bookingInputMapper;
		this.bookingDAO = bookingDAO;
		this.sessionDAO = sessionDAO;
		this.studentDAO = studentDAO;
		this.referralCodeDAO = referralCodeDAO;
		this.bookingValidator = bookingValidator;
		this.sessionValidator = sessionValidator;
		this.referralCodeValidator = referralCodeValidator;
	}

	@QueryMapping
	public List<Booking> getBookings() {
		return bookingDAO.select();
	}

	@QueryMapping
	public Optional<Booking> getBookingByID(UUID bookingID) {
		return bookingDAO.selectByID(bookingID);
	}

	@QueryMapping
	public boolean isEquipmentAvailable(@Argument UUID sessionID) {
		return bookingValidator.isEquipmentAvailable(sessionID);
	}

	@MutationMapping
	public UUID deleteBookingByID(@Argument UUID bookingID) {
		bookingValidator.validateID(bookingID);

		Booking booking = bookingDAO.selectByID(bookingID).get();
		Session session = sessionDAO.selectByID(booking.getSessionID()).get();
		sessionValidator.validateIsNotInPast(session.getStartTime());

		bookingDAO.deleteByID(bookingID);

		return bookingID;
	}

	@SchemaMapping(typeName = "Booking", field = "session")
	public Session getSession(Booking booking) {
		Optional<Session> session = sessionDAO.selectByID(booking.getSessionID());

		if (session.isEmpty()) {
			throw new RuntimeException("Session not found");
		}

		return session.get();
	}

	@SchemaMapping(typeName = "Booking", field = "student")
	public Student getStudent(Booking booking) {
		return studentDAO.selectByID(booking.getStudentID()).get();
	}

	@MutationMapping
	public Booking createBookingReferralCode(
		@Argument BookingInput input,
		@Argument String studentID,
		@Argument String code
	) {
		bookingValidator.validateCreateWithReferralCode(input, studentID, code);

		Booking booking = bookingInputMapper.map(input);
		booking.setStudentID(studentID);

		Booking savedBooking = bookingDAO.insert(booking);

		ReferralCode referralCode = new ReferralCode();
		referralCode.setUsedAt(Instant.now());

		referralCodeDAO.updateByID(code, referralCode);

		return savedBooking;
	}

	@MutationMapping
	public Booking createBookingFree(@Argument BookingInput input, @Argument String studentID) {
		bookingValidator.validateCreateFree(input, studentID);

		Booking booking = bookingInputMapper.map(input);
		booking.setStudentID(studentID);

		return bookingDAO.insert(booking);
	}

	@MutationMapping
	public Booking updateBookingByID(@Argument UUID bookingID, @Argument BookingInput input) {
		bookingValidator.validateUpdate(bookingID, input);

		Booking booking = bookingInputMapper.map(input);

		return bookingDAO.updateByID(bookingID, booking);
	}
}
