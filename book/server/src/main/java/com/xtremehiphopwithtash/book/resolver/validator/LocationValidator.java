package com.xtremehiphopwithtash.book.resolver.validator;

import com.google.openlocationcode.OpenLocationCode;
import com.xtremehiphopwithtash.book.dao.CourseDAO;
import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.LocationInput;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class LocationValidator implements Validator<UUID, LocationInput> {

	private final LocationDAO locationDAO;
	private final CourseDAO courseDAO;
	private final SessionDAO sessionDAO;
	private final CommonValidator commonValidator;

	public LocationValidator(
		LocationDAO locationDAO,
		CourseDAO courseDAO,
		SessionDAO sessionDAO,
		CommonValidator commonValidator
	) {
		this.locationDAO = locationDAO;
		this.courseDAO = courseDAO;
		this.sessionDAO = sessionDAO;
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

		List<Course> courses = courseDAO.selectByLocationID(locationID);

		if (!courses.isEmpty()) {
			throw new ResolverException(
				String.format(
					"Location is assigned to course: %s",
					String.join(", ", courses.stream().map(course -> course.getName()).toList())
				)
			);
		}

		List<Session> sessions = sessionDAO.selectByLocationID(locationID);

		if (!sessions.isEmpty()) {
			throw new ResolverException("Cannot delete location with sessions");
		}
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
}
