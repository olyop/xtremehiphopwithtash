package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class BookingValidator implements Validator<UUID, BookingInput> {

	private final BookingDAO bookingDAO;
	private final SessionValidator sessionValidator;
	private final SessionDAO sessionDAO;

	public BookingValidator(
		BookingDAO bookingDAO,
		SessionValidator sessionValidator,
		SessionDAO sessionDAO
	) {
		this.bookingDAO = bookingDAO;
		this.sessionValidator = sessionValidator;
		this.sessionDAO = sessionDAO;
	}

	@Override
	public void validateID(UUID bookingID) {
		if (!bookingDAO.existsByID(bookingID)) {
			throw new ResolverException("Booking does not exist");
		}
	}

	@Override
	public void validateInput(BookingInput input) {
		Optional<String> notes = input.getNotes();
		Boolean isBringingOwnEquipment = input.getIsBringingOwnEquipment();
		UUID sessionID = input.getSessionID();

		validateNotes(notes);
		sessionValidator.validateID(sessionID);
		checkThereIsCapacity(sessionID);
		checkThereIsEquipmentAvailable(isBringingOwnEquipment, sessionID);
	}

	public void checkStudentHasNotBookedSession(String studentID, UUID sessionID) {
		if (bookingDAO.existsByStudentAndSession(studentID, sessionID)) {
			throw new ResolverException("You have already booked for this session");
		}
	}

	public void checkThereIsEquipmentAvailable(Boolean isBringingOwnEquipment, UUID sessionID) {
		if (isBringingOwnEquipment && !isEquipmentAvailable(sessionID)) {
			throw new ResolverException("No equipment available");
		}
	}

	private void validateNotes(Optional<String> notes) {
		if (notes.isPresent() && notes.isEmpty()) {
			throw new ResolverException("Notes cannot be empty");
		}
	}

	private void checkThereIsCapacity(UUID sessionID) {
		Session session = sessionDAO.selectByID(sessionID).get();
		Short capacity = session.getCapacity();
		Short bookings = bookingDAO.selectCountBySessionID(sessionID);

		if ((capacity - bookings) <= 0) {
			throw new ResolverException("No capacity available");
		}
	}

	public boolean isEquipmentAvailable(UUID sessionID) {
		Session session = sessionDAO.selectByID(sessionID).get();
		Short equipmentAvailable = session.getEquipmentAvailable();
		Short equipmentUsed = bookingDAO.selectCountBySessionIDAndBringingOwnEquipment(sessionID);

		return (equipmentAvailable - equipmentUsed) > 0;
	}
}
