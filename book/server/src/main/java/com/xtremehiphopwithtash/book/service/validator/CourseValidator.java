package com.xtremehiphopwithtash.book.service.validator;

import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.CourseInput;
import com.xtremehiphopwithtash.book.service.dao.CourseDAO;
import com.xtremehiphopwithtash.book.service.dao.SessionDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class CourseValidator implements ValidatorCRUD<UUID, CourseInput> {

	private final CourseDAO courseDAO;
	private final SessionDAO sessionDAO;
	private final CommonValidator commonValidator;
	private final LocationValidator locationValidtor;
	private final InstructorValidator instructorValidator;

	public CourseValidator(
		CourseDAO courseDAO,
		SessionDAO sessionDAO,
		CommonValidator commonValidator,
		LocationValidator locationValidtor,
		InstructorValidator instructorValidator
	) {
		this.courseDAO = courseDAO;
		this.sessionDAO = sessionDAO;
		this.commonValidator = commonValidator;
		this.locationValidtor = locationValidtor;
		this.instructorValidator = instructorValidator;
	}

	@Override
	public void validateCreate(CourseInput input) {
		validateInput(input);
		validateCourseName(input);
	}

	@Override
	public void validateUpdate(UUID courseID, CourseInput input) {
		validateID(courseID);
		validateInput(input);
	}

	@Override
	public void validateDelete(UUID courseID) {
		validateID(courseID);
		validateSessions(courseID);
	}

	@Override
	public void validateID(UUID courseID) {
		if (!courseDAO.existsByID(courseID)) {
			throw new ResolverException("Course does not exist");
		}
	}

	@Override
	public void validateInput(CourseInput input) {
		commonValidator.validateText(input.name(), "Name", 255);
		commonValidator.validateText(input.description(), "Description", 1024);
		commonValidator.validateURL(input.photo(), "Photo");
		commonValidator.validatePrice(input.defaultPrice(), "Default price");
		commonValidator.validatePrice(input.defaultEquipmentFee(), "Default equipment fee");
		locationValidtor.validateID(input.defaultLocationID());

		validateEquipmentAndCapacity(input);
		validateDuration(input.defaultDuration());
		validateDefaultInstructorIDs(input.defaultInstructorIDs());
	}

	public void validateCourseName(CourseInput input) {
		if (courseDAO.existsByName(input.name())) {
			throw new ResolverException("Course with name already exists");
		}
	}

	private void validateDefaultInstructorIDs(List<UUID> defaultInstructorIDs) {
		if (defaultInstructorIDs.isEmpty()) {
			throw new ResolverException("At least one default instructor must be set");
		}

		for (UUID defaultInstructorID : defaultInstructorIDs) {
			instructorValidator.validateID(defaultInstructorID);
		}
	}

	private void validateEquipmentAndCapacity(CourseInput input) {
		if (
			input.defaultEquipmentAvailable().isPresent() &&
			input.defaultEquipmentAvailable().get() > input.defaultCapacityAvailable()
		) {
			throw new ResolverException("Cannot add more equipment than capacity");
		}
	}

	private void validateDuration(Short defaultDuration) {
		if (defaultDuration > 60 * 60 * 4) {
			throw new ResolverException("Default duration cannot be greater than 4 hours");
		}
	}

	private void validateSessions(UUID courseID) {
		List<Session> sessions = sessionDAO.selectByCourseID(courseID);

		if (!sessions.isEmpty()) {
			throw new ResolverException("Cannot delete course with sessions");
		}
	}
}
