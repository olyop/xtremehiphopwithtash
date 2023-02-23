package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.resolver.input.LocationInput;
import com.xtremehiphopwithtash.book.resolver.validator.LocationValidtor;
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
	private final LocationValidtor locationValidtor;

	public LocationResolver(LocationDAO locationDAO, LocationValidtor locationValidtor) {
		this.locationDAO = locationDAO;
		this.locationValidtor = locationValidtor;
	}

	@QueryMapping
	public List<Location> getLocations() {
		return locationDAO.select();
	}

	@QueryMapping
	public Optional<Location> getLocationByID(@Argument UUID locationID) {
		return locationDAO.selectByID(locationID);
	}

	@MutationMapping
	public Location createLocation(@Argument LocationInput input) {
		String name = input.getName();
		String plusCode = input.getPlusCode();

		locationValidtor.validateInput(input);
		locationValidtor.validateExists(name, plusCode);

		Location location = new Location();
		location.setName(name);
		location.setPlusCode(plusCode);

		return locationDAO.insert(location);
	}

	@MutationMapping
	public Location updateLocationByID(@Argument UUID locationID, @Argument LocationInput input) {
		String name = input.getName();
		String plusCode = input.getPlusCode();

		locationValidtor.validateID(locationID);
		locationValidtor.validateInput(input);

		Location location = new Location();
		location.setName(name);
		location.setPlusCode(plusCode);

		return locationDAO.updateByID(locationID, location);
	}

	@MutationMapping
	public UUID deleteLocationByID(@Argument UUID locationID) {
		locationValidtor.validateID(locationID);
		locationValidtor.canDelete(locationID);

		locationDAO.deleteByID(locationID);

		return locationID;
	}
}
