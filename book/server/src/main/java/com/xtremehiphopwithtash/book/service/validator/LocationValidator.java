package com.xtremehiphopwithtash.book.service.validator;

import com.google.openlocationcode.OpenLocationCode;
import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.LocationInput;
import com.xtremehiphopwithtash.book.service.CourseService;
import com.xtremehiphopwithtash.book.service.LocationService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.dao.CourseDAO;
import com.xtremehiphopwithtash.book.service.dao.LocationDAO;
import com.xtremehiphopwithtash.book.service.dao.SessionDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class LocationValidator implements ValidatorCRUD<UUID, LocationInput> {

	private final CourseDAO courseDAO;
	private final SessionDAO sessionDAO;
	private final LocationDAO locationDAO;
	private final CommonValidator commonValidator;

	public LocationValidator(
		CourseDAO courseDAO,
		SessionDAO sessionDAO,
		LocationDAO locationDAO,
		CommonValidator commonValidator
	) {
		this.courseDAO = courseDAO;
		this.sessionDAO = sessionDAO;
		this.locationDAO = locationDAO;
		this.commonValidator = commonValidator;
	}

	@Override
	public void validateCreate(LocationInput input) {
		validateInput(input);
		validateExists(input);
	}

	@Override
	public void validateUpdate(UUID locationID, LocationInput input) {
		validateID(locationID);
		validateInput(input);
	}

	@Override
	public void validateDelete(UUID locationID) {
		validateID(locationID);
		validateCourses(locationID);
		validateSessions(locationID);
	}

	@Override
	public void validateID(UUID locationID) {
		if (!locationDAO.existsByID(locationID)) {
			throw new ResolverException("Location does not exist");
		}
	}

	@Override
	public void validateInput(LocationInput input) {
		commonValidator.validateText(input.name(), "Name", 255);
		commonValidator.validateText(input.address(), "Address", 1024);
		commonValidator.validateText(input.plusCode(), "Plus Code", 15);
		validatePlusCode(input.plusCode());
	}

	private void validatePlusCode(String plusCode) {
		try {
			OpenLocationCode olc = new OpenLocationCode(plusCode);

			if (olc.isShort()) {
				throw new ResolverException("Full plus code required");
			}
		} catch (IllegalArgumentException e) {
			throw new ResolverException("Invalid plus code");
		}
	}

	public void validateExists(LocationInput input) {
		if (locationDAO.checkForDuplicate(input.name(), input.plusCode(), input.address())) {
			throw new ResolverException("Location does not exist");
		}
	}

	private void validateCourses(UUID locationID) {
		List<Course> courses = courseDAO.selectByLocationID(locationID);

		if (!courses.isEmpty()) {
			List<String> courseNames = courses.stream().map(course -> course.getName()).toList();

			throw new ResolverException(
				String.format("Location is assigned to course(s): %s", String.join(", ", courseNames))
			);
		}
	}

	private void validateSessions(UUID locationID) {
		List<Session> sessions = sessionDAO.selectByLocationID(locationID);

		if (!sessions.isEmpty()) {
			throw new ResolverException("Cannot delete location with sessions");
		}
	}
}
