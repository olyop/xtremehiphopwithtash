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

	private final BookingDAO bookingDAO;
	private final SessionDAO sessionDAO;
	private final StudentDAO studentDAO;
	private final ReferralCodeDAO referralCodeDAO;
	private final BookingValidator bookingValidator;
	private final SessionValidator sessionValidator;
	private final ReferralCodeValidator referralCodeValidator;

	public BookingResolver(
		BookingDAO bookingDAO,
		SessionDAO sessionDAO,
		StudentDAO studentDAO,
		ReferralCodeDAO referralCodeDAO,
		BookingValidator bookingValidator,
		SessionValidator sessionValidator,
		ReferralCodeValidator referralCodeValidator
	) {
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

	private final String studentID = "facebook|5800638673389425";

	@MutationMapping
	public Booking createBookingReferralCode(@Argument BookingInput input, @Argument String code) {
		UUID sessionID = input.getSessionID();
		Optional<String> notes = input.getNotes();
		Boolean isBringingOwnEquipment = input.getIsBringingOwnEquipment();

		sessionValidator.validateID(sessionID);
		bookingValidator.validateInput(input);
		bookingValidator.checkStudentHasNotBookedSession(studentID, sessionID);

		referralCodeValidator.validateNotEmpty(code);
		referralCodeValidator.validateID(code);
		referralCodeValidator.validateCodeNotUsed(code);

		Booking booking = new Booking();
		booking.setSessionID(sessionID);
		booking.setStudentID(studentID);
		booking.setNotes(notes.orElse(null));
		booking.setIsBringingOwnEquipment(isBringingOwnEquipment);

		Booking newBooking = bookingDAO.insert(booking);

		ReferralCode referralCode = new ReferralCode();
		referralCode.setUsedAt(Instant.now());

		referralCodeDAO.updateByID(code, referralCode);

		return newBooking;
	}

	@MutationMapping
	public Booking createBookingFree(@Argument BookingInput input) {
		UUID sessionID = input.getSessionID();
		Optional<String> notes = input.getNotes();
		Boolean isBringingOwnEquipment = input.getIsBringingOwnEquipment();

		sessionValidator.validateID(sessionID);
		bookingValidator.validateInput(input);
		bookingValidator.checkStudentHasNotBookedSession(studentID, sessionID);

		Booking booking = new Booking();
		booking.setSessionID(sessionID);
		booking.setStudentID(studentID);
		booking.setNotes(notes.orElse(null));
		booking.setIsBringingOwnEquipment(isBringingOwnEquipment);

		return bookingDAO.insert(booking);
	}

	@MutationMapping
	Booking updateBookingByID(@Argument UUID bookingID, @Argument BookingInput input) {
		UUID sessionID = input.getSessionID();
		Optional<String> notes = input.getNotes();
		Boolean isBringingOwnEquipment = input.getIsBringingOwnEquipment();

		bookingValidator.validateID(bookingID);
		bookingValidator.validateInput(input);
		sessionValidator.validateID(sessionID);
		sessionValidator.validateIsNotInPast(
			sessionDAO
				.selectByID(bookingDAO.selectByID(bookingID).get().getSessionID())
				.get()
				.getStartTime()
		);

		Booking booking = new Booking();
		booking.setSessionID(sessionID);
		booking.setStudentID(studentID);
		booking.setNotes(notes.orElse(null));
		booking.setIsBringingOwnEquipment(isBringingOwnEquipment);

		return bookingDAO.updateByID(bookingID, booking);
	}
}
