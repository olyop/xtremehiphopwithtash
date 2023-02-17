package com.xtremehiphopwithtash.book.resolver.validator;

import com.google.openlocationcode.OpenLocationCode;
import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.resolver.input.LocationInput;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class LocationValidtor implements Validator<UUID, LocationInput> {

	private LocationDAO locationDAO;

	public LocationValidtor(LocationDAO locationDAO) {
		this.locationDAO = locationDAO;
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

		if (locationDAO.existsByNameOrPlusCode(name, plusCode)) {
			throw new ResolverException("Location already exists");
		}
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
}
