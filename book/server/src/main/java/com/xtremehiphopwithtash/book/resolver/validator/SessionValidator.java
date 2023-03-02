package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.resolver.input.GetSessionsInput;
import com.xtremehiphopwithtash.book.resolver.input.SessionInput;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class SessionValidator implements Validator<UUID, SessionInput> {

	private final SessionDAO sessionDAO;
	private final CommonValidator commonValidator;
	private final CourseValidator courseValidator;
	private final LocationValidtor locationValidator;
	private final InstructorValidator instructorValidator;

	private final Integer thirtyMinutes = 60 * 30;
	private final Integer fourHours = 60 * 60 * 4;
	private final Integer fourWeeks = 60 * 60 * 24 * 7 * 4;

	public SessionValidator(
		SessionDAO sessionDAO,
		CommonValidator commonValidator,
		CourseValidator courseValidator,
		LocationValidtor locationValidator,
		InstructorValidator instructorValidator
	) {
		this.sessionDAO = sessionDAO;
		this.commonValidator = commonValidator;
		this.courseValidator = courseValidator;
		this.locationValidator = locationValidator;
		this.instructorValidator = instructorValidator;
	}

	@Override
	public void validateID(UUID sessionID) {
		if (!sessionDAO.existsByID(sessionID)) {
			throw new ResolverException("Session does not exist");
		}
	}

	@Override
	public void validateInput(SessionInput input) {
		String title = input.getTitle();
		String notes = input.getNotes();
		Optional<Short> price = input.getPrice();
		Instant startTime = input.getStartTime();
		Instant endTime = input.getEndTime();
		Short capacity = input.getCapacity();
		Short equipmentAvailable = input.getEquipmentAvailable();
		UUID courseID = input.getCourseID();
		UUID locationID = input.getLocationID();
		List<UUID> instructorIDs = input.getInstructorIDs();

		courseValidator.validateID(courseID);
		locationValidator.validateID(locationID);
		validateInstructorIDs(instructorIDs);
		validateLength(title, notes);
		validateNotEmpty(title, notes);
		commonValidator.validatePrice(price);
		validateStartAndEndTime(startTime, endTime);
		validateEquipmentAndCapacity(capacity, equipmentAvailable);
	}

	public void validateGetSessionsInput(GetSessionsInput input) {
		Optional<UUID> courseID = input.getCourseID();
		Instant startTime = input.getStartTime();
		Instant endTime = input.getEndTime();

		if (courseID.isPresent()) {
			courseValidator.validateID(courseID.get());
		}

		if (startTime.isAfter(endTime)) {
			throw new ResolverException("Start time must be before end time");
		}

		if (startTime.plusSeconds(fourWeeks).isBefore(endTime)) {
			throw new ResolverException("Cannot get sessions for more than 4 weeks");
		}
	}

	private void validateLength(String title, String notes) {
		commonValidator.validateStringLength(title, "Title", 255);
		commonValidator.validateStringLength(notes, "Notes", 1024);
	}

	private void validateNotEmpty(String title, String notes) {
		if (title.isEmpty()) {
			throw new ResolverException("Title cannot be empty");
		}

		if (notes.isEmpty()) {
			throw new ResolverException("Notes cannot be empty");
		}
	}

	private void validateEquipmentAndCapacity(Short capacity, Short equipmentAvailable) {
		if (capacity >= equipmentAvailable) {
			throw new ResolverException("Cannot add more equipment than capacity");
		}
	}

	private void validateInstructorIDs(List<UUID> instructorIDs) {
		if (instructorIDs.isEmpty()) {
			throw new ResolverException("Default instructor IDs cannot be empty");
		}

		for (UUID instructorID : instructorIDs) {
			instructorValidator.validateID(instructorID);
		}
	}

	private void validateStartAndEndTime(Instant startTime, Instant endTime) {
		Instant now = Instant.now();
		Instant nowInThirtyMinutes = now.plusSeconds(thirtyMinutes);
		Instant nowInFourHours = now.plusSeconds(fourHours);

		if (startTime.isBefore(now)) {
			throw new ResolverException("Start time must be in the future");
		}

		if (startTime.isAfter(endTime)) {
			throw new ResolverException("Start time must be before end time");
		}

		if (endTime.isBefore(nowInThirtyMinutes)) {
			throw new ResolverException("The session must be at least 30 minutes long");
		}

		if (endTime.isAfter(nowInFourHours)) {
			throw new ResolverException("The session cannot be over 4 hours");
		}

		if (!sessionDAO.selectInTimePeriod(startTime, endTime).isEmpty()) {
			throw new ResolverException("Session already exists in time period");
		}
	}
}
