package com.xtremehiphopwithtash.book.service.validator;

import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
import com.xtremehiphopwithtash.book.service.dao.CourseDAO;
import com.xtremehiphopwithtash.book.service.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.service.dao.SessionDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class InstructorValidator implements ValidatorCRUD<UUID, InstructorInput> {

	private final InstructorDAO instructorDAO;
	private final CourseDAO courseDAO;
	private final SessionDAO sessionDAO;
	private final CommonValidator commonValidator;
	private final DetailsValidator detailsValidator;

	public InstructorValidator(
		InstructorDAO instructorDAO,
		CourseDAO courseDAO,
		SessionDAO sessionDAO,
		CommonValidator commonValidator,
		DetailsValidator detailsValidator
	) {
		this.instructorDAO = instructorDAO;
		this.courseDAO = courseDAO;
		this.sessionDAO = sessionDAO;
		this.commonValidator = commonValidator;
		this.detailsValidator = detailsValidator;
	}

	@Override
	public void validateCreate(InstructorInput input) {
		validateInput(input);
	}

	@Override
	public void validateUpdate(UUID instructorID, InstructorInput input) {
		validateID(instructorID);
		validateInput(input);
	}

	@Override
	public void validateCancel(UUID instructorID) {
		validateID(instructorID);
		validateCourses(instructorID);
		validateSessions(instructorID);
	}

	@Override
	public void validateID(UUID instructorID) {
		if (!instructorDAO.existsByID(instructorID)) {
			throw new ResolverException("Instructor does not exist");
		}
	}

	@Override
	public void validateInput(InstructorInput input) {
		commonValidator.validateURL(input.photo(), "Photo");
		detailsValidator.validateInput(input.details());
	}

	private void validateCourses(UUID instructorID) {
		List<Course> courses = courseDAO.selectByInstructorID(instructorID);

		if (!courses.isEmpty()) {
			List<String> courseNames = courses.stream().map(course -> course.getName()).toList();

			throw new ResolverException(
				String.format("Instructor is assigned to course(s): %s", String.join(", ", courseNames))
			);
		}
	}

	private void validateSessions(UUID instructorID) {
		List<Session> sessions = sessionDAO.selectByInstructorID(instructorID);

		if (!sessions.isEmpty()) {
			throw new ResolverException("Cannot delete instructor with sessions");
		}
	}
}
