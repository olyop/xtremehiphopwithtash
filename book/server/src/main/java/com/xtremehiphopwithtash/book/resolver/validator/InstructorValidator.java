package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.CourseDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
import java.net.URL;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class InstructorValidator implements Validator<UUID, InstructorInput> {

	private final InstructorDAO instructorDAO;
	private final CommonValidator commonValidator;
	private final DetailsValidator detailsValidator;
	private final CourseDAO courseDAO;
	private final SessionDAO sessionDAO;

	public InstructorValidator(
		InstructorDAO instructorDAO,
		CommonValidator commonValidator,
		DetailsValidator detailsValidator,
		CourseDAO courseDAO,
		SessionDAO sessionDAO
	) {
		this.instructorDAO = instructorDAO;
		this.commonValidator = commonValidator;
		this.detailsValidator = detailsValidator;
		this.courseDAO = courseDAO;
		this.sessionDAO = sessionDAO;
	}

	public void validateID(UUID instructorID) {
		if (!instructorDAO.existsByID(instructorID)) {
			throw new ResolverException("Instructor does not exist");
		}
	}

	public void validateInput(InstructorInput input) {
		URL photo = input.getPhoto();
		DetailsInput detailsInput = input.getDetails();

		commonValidator.validateURL(photo);
		detailsValidator.validateInput(detailsInput);
	}

	public void validateCanDelete(UUID instructorID) {
		List<Course> courses = courseDAO.selectByInstructorID(instructorID);

		if (!courses.isEmpty()) {
			throw new ResolverException(
				String.format(
					"Instructor is assigned to course: %s",
					String.join(", ", courses.stream().map(course -> course.getName()).toList())
				)
			);
		}

		List<Session> sessions = sessionDAO.selectByInstructorID(instructorID);

		if (!sessions.isEmpty()) {
			throw new ResolverException("Cannot delete instructor with sessions");
		}
	}
}
