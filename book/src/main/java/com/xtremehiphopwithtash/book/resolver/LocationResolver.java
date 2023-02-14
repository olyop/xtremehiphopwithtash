package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.resolver.input.CreateLocationInput;
import com.xtremehiphopwithtash.book.util.ValidationUtil;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class LocationResolver {

	private final LocationDAO locationDAO;

	public LocationResolver(LocationDAO locationDAO) {
		this.locationDAO = locationDAO;
	}

	@QueryMapping
	public List<Location> getLocations() {
		return locationDAO.select();
	}

	@QueryMapping
	public Optional<Location> getLocationByID(@Argument UUID id) {
		return locationDAO.selectByID(id);
	}

	@MutationMapping
	public Location createLocation(@Argument CreateLocationInput input) {
		String name = input.getName();
		String plusCode = input.getPlusCode();

		if (!ValidationUtil.verifyPlusCode(plusCode)) {
			throw new IllegalArgumentException("Invalid plus code");
		}

		if (!locationDAO.existsByNameAndPlusCode(name, plusCode)) {
			throw new IllegalArgumentException("Location already exists");
		}

		Location location = new Location();
		location.setName(name);
		location.setPlusCode(plusCode);

		return locationDAO.insert(location);
	}
}
