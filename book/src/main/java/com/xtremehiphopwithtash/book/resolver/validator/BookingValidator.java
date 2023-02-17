package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class BookingValidator implements Validator<UUID, BookingInput> {

	private final BookingDAO bookingDAO;
	private final SessionValidator sessionValidator;
	private final StudentValidator studentValidator;
	private final SessionDAO sessionDAO;

	public BookingValidator(
		BookingDAO bookingDAO,
		SessionValidator sessionValidator,
		StudentValidator studentValidator,
		SessionDAO sessionDAO
	) {
		this.bookingDAO = bookingDAO;
		this.sessionValidator = sessionValidator;
		this.studentValidator = studentValidator;
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
		String notes = input.getNotes();
		Boolean isBringingOwnEquipment = input.isBringingOwnEquipment();
		UUID sessionID = input.getSessionID();
		String studentID = input.getStudentID();

		validateNotes(notes);
		sessionValidator.validateID(sessionID);
		studentValidator.validateID(studentID);
		checkThereIsCapacity(sessionID);
		checkThereIsEquipmentAvailable(isBringingOwnEquipment, sessionID);
	}

	private void validateNotes(String notes) {
		if (notes.isEmpty()) {
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

	private void checkThereIsEquipmentAvailable(Boolean isBringingOwnEquipment, UUID sessionID) {
		if (isBringingOwnEquipment) {
			Session session = sessionDAO.selectByID(sessionID).get();
			Short equipmentAvailable = session.getEquipmentAvailable();
			Short equipmentUsed = bookingDAO.selectCountBySessionIDAndBringingOwnEquipment(sessionID);

			if ((equipmentAvailable - equipmentUsed) <= 0) {
				throw new ResolverException("No equipment available");
			}
		}
	}
}
