package com.xtremehiphopwithtash.book.resolver;

import com.google.openlocationcode.OpenLocationCode;
import com.google.openlocationcode.OpenLocationCode.CodeArea;
import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.model.Place;
import com.xtremehiphopwithtash.book.other.Coordinates;
import com.xtremehiphopwithtash.book.resolver.input.LocationInput;
import com.xtremehiphopwithtash.book.resolver.mapper.LocationInputMapper;
import com.xtremehiphopwithtash.book.resolver.validator.LocationValidator;
import com.xtremehiphopwithtash.book.service.GoogleMaps;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class LocationResolver {

	private final LocationInputMapper locationInputMapper;
	private final LocationDAO locationDAO;
	private final LocationValidator locationValidtor;
	private final GoogleMaps googleMaps;

	public LocationResolver(
		LocationInputMapper locationInputMapper,
		LocationDAO locationDAO,
		LocationValidator locationValidtor,
		GoogleMaps googleMaps
	) {
		this.locationInputMapper = locationInputMapper;
		this.locationDAO = locationDAO;
		this.locationValidtor = locationValidtor;
		this.googleMaps = googleMaps;
	}

	@QueryMapping
	public List<Location> getLocations() {
		return locationDAO.select();
	}

	@QueryMapping
	public Optional<Location> getLocationByID(@Argument UUID locationID) {
		return locationDAO.selectByID(locationID);
	}

	@SchemaMapping(typeName = "Location", field = "coordinates")
	public Coordinates getCoordinates(Location location) {
		OpenLocationCode code = new OpenLocationCode(location.getPlusCode());
		CodeArea area = code.decode();
		return new Coordinates(area.getCenterLatitude(), area.getCenterLongitude());
	}

	@MutationMapping
	public Location createLocation(@Argument LocationInput input) {
		locationValidtor.validateCreate(input);

		Location location = locationInputMapper.map(input);

		return locationDAO.insert(location);
	}

	@MutationMapping
	public Location updateLocationByID(@Argument UUID locationID, @Argument LocationInput input) {
		locationValidtor.validateUpdate(locationID, input);

		Location location = locationInputMapper.map(input);

		return locationDAO.updateByID(locationID, location);
	}

	@MutationMapping
	public UUID deleteLocationByID(@Argument UUID locationID) {
		locationValidtor.validateDelete(locationID);

		locationDAO.deleteByID(locationID);

		return locationID;
	}

	@QueryMapping
	public Coordinates decodePlusCode(@Argument String plusCode) {
		try {
			OpenLocationCode olc = new OpenLocationCode(plusCode);
			CodeArea decode = olc.decode();
			return new Coordinates(decode.getCenterLatitude(), decode.getCenterLongitude());
		} catch (Exception e) {
			throw new IllegalArgumentException("Invalid plus code: " + plusCode);
		}
	}

	@QueryMapping
	public Place searchPlaceByName(@Argument String name) {
		try {
			Place place = googleMaps.searchPlaceByName(name);

			if (place == null) {
				return null;
			}

			return place;
		} catch (Exception e) {
			return null;
		}
	}
}
