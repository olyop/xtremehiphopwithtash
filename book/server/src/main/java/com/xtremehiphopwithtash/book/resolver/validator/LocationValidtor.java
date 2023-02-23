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
public class LocationValidtor implements Validator<UUID, LocationInput> {

	private final LocationDAO locationDAO;
	private final CourseDAO courseDAO;
	private final SessionDAO sessionDAO;

	public LocationValidtor(LocationDAO locationDAO, CourseDAO courseDAO, SessionDAO sessionDAO) {
		this.locationDAO = locationDAO;
		this.courseDAO = courseDAO;
		this.sessionDAO = sessionDAO;
	}

	@Override
	public void validateID(UUID id) {
		if (!locationDAO.existsByID(id)) {
			throw new ResolverException("Location does not exist");
		}
	}

	@Override
	public void validateInput(LocationInput input) {
		String name = input.getName();
		String plusCode = input.getPlusCode();

		validateNotEmpty(name, plusCode);
		validatePlusCode(plusCode);
	}

	private void validateNotEmpty(String name, String plusCode) {
		if (name.isEmpty()) {
			throw new ResolverException("Name cannot be empty");
		}

		if (plusCode.isEmpty()) {
			throw new ResolverException("Plus code cannot be empty");
		}
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

	public void validateExists(String name, String plusCode) {
		if (locationDAO.existsByNameOrPlusCode(name, plusCode)) {
			throw new ResolverException("Location does not exist");
		}
	}

	public void canDelete(UUID locationID) {
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
}
