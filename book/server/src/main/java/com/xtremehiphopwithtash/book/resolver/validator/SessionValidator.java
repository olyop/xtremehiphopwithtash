package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.GetSessionsInput;
import com.xtremehiphopwithtash.book.resolver.input.SessionInput;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class SessionValidator implements ValidatorCRUD<UUID, SessionInput> {

	private final SessionDAO sessionDAO;
	private final BookingDAO bookingDAO;
	private final CommonValidator commonValidator;
	private final CourseValidator courseValidator;
	private final LocationValidator locationValidator;
	private final InstructorValidator instructorValidator;

	private final int thirtyMinutes = 60 * 30;
	private final int fourHours = 60 * 60 * 4;

	public SessionValidator(
		SessionDAO sessionDAO,
		BookingDAO bookingDAO,
		CommonValidator commonValidator,
		CourseValidator courseValidator,
		LocationValidator locationValidator,
		InstructorValidator instructorValidator
	) {
		this.sessionDAO = sessionDAO;
		this.bookingDAO = bookingDAO;
		this.commonValidator = commonValidator;
		this.courseValidator = courseValidator;
		this.locationValidator = locationValidator;
		this.instructorValidator = instructorValidator;
	}

	@Override
	public void validateCreate(SessionInput input) {
		validateInput(input);
		validateIsNotInPast(input.startTime());
		validateSessionInPeriod(input);
	}

	@Override
	public void validateUpdate(UUID sessionID, SessionInput input) {
		validateID(sessionID);
		validateSessionInPeriodExcludeSession(sessionID, input);
		validateInput(input);
		validateCapacityIsNotLessThanBookings(sessionID, input);
	}

	@Override
	public void validateDelete(UUID sessionID) {
		validateID(sessionID);

		List<Booking> bookings = bookingDAO.selectBySessionID(sessionID);

		if (!bookings.isEmpty()) {
			throw new ResolverException("Cannot delete session with bookings");
		}
	}

	@Override
	public void validateID(UUID sessionID) {
		if (!sessionDAO.existsByID(sessionID)) {
			throw new ResolverException("Session does not exist");
		}
	}

	@Override
	public void validateInput(SessionInput input) {
		commonValidator.validateText(input.title(), "Title", 255);
		commonValidator.validateText(input.notes(), "Notes", 1024);
		commonValidator.validatePrice(input.price(), "Price");
		commonValidator.validatePrice(input.equipmentFee(), "Equipment fee");
		commonValidator.validateNonZeroInteger(input.capacity(), "Capacity");
		commonValidator.validateNonZeroInteger(input.equipmentAvailable(), "Equipment available");
		courseValidator.validateID(input.courseID());
		locationValidator.validateID(input.locationID());
		validateStartAndEndTime(input);
		validateInstructorIDs(input);
		validateEquipmentAndCapacity(input);
	}

	private void validateSessionInPeriod(SessionInput input) {
		List<Session> sessions = sessionDAO.selectInTimePeriod(input.startTime(), input.endTime());

		if (!sessions.isEmpty()) {
			throw new ResolverException("Session already exists in time period");
		}
	}

	private void validateSessionInPeriodExcludeSession(UUID sessionID, SessionInput input) {
		List<Session> sessions = sessionDAO.selectInTimePeriodExcludeSession(
			input.startTime(),
			input.endTime(),
			sessionID
		);

		if (!sessions.isEmpty()) {
			throw new ResolverException("Session already exists in time period");
		}
	}

	public void validateGetSessionsInput(GetSessionsInput input) {
		if (input.courseID().isPresent()) {
			courseValidator.validateID(input.courseID().get());
		}

		if (input.startTime().isAfter(input.endTime())) {
			throw new ResolverException("Start time must be before end time");
		}
	}

	public void validateIsNotInPast(Instant startTime) {
		Instant now = Instant.now();

		if (startTime.isBefore(now)) {
			throw new ResolverException("Session cannot start in the past");
		}
	}

	private void validateEquipmentAndCapacity(SessionInput input) {
		if (input.equipmentAvailable().isPresent()) {
			if (input.equipmentAvailable().get() > input.capacity()) {
				throw new ResolverException("Cannot add more equipment than capacity");
			}
		}
	}

	private void validateCapacityIsNotLessThanBookings(UUID sessionID, SessionInput input) {
		short bookingsTotal = bookingDAO.selectCountBySessionID(sessionID);

		if (input.capacity() < bookingsTotal) {
			throw new ResolverException("Cannot reduce capacity below number of bookings");
		}
	}

	private void validateInstructorIDs(SessionInput input) {
		if (input.instructorIDs().isEmpty()) {
			throw new ResolverException("Default instructor IDs cannot be empty");
		}

		for (UUID instructorID : input.instructorIDs()) {
			instructorValidator.validateID(instructorID);
		}
	}

	private void validateStartAndEndTime(SessionInput input) {
		Instant startTime = input.startTime();
		Instant endTime = input.endTime();

		Instant startTimeInThirtyMinutes = startTime.plusSeconds(thirtyMinutes);
		Instant startTimeInFourHours = startTime.plusSeconds(fourHours);

		if (startTime.equals(endTime)) {
			throw new ResolverException("Start time and end time cannot be the same");
		}

		if (startTime.isAfter(endTime)) {
			throw new ResolverException("Start time must be before end time");
		}

		if (endTime.isBefore(startTimeInThirtyMinutes)) {
			throw new ResolverException("The session must be at least 30 minutes long");
		}

		if (endTime.isAfter(startTimeInFourHours)) {
			throw new ResolverException("The session cannot be over 4 hours");
		}
	}
}
