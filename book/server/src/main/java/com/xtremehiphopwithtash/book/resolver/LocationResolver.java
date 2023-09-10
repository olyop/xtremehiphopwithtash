package com.xtremehiphopwithtash.book.resolver;

import com.google.openlocationcode.OpenLocationCode;
import com.google.openlocationcode.OpenLocationCode.CodeArea;
import com.xtremehiphopwithtash.book.graphql.input.LocationInput;
import com.xtremehiphopwithtash.book.service.database.location.Location;
import com.xtremehiphopwithtash.book.service.database.location.LocationService;
import com.xtremehiphopwithtash.book.service.integration.auth0jwt.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.integration.googlemaps.GoogleMapsCoordinates;
import com.xtremehiphopwithtash.book.service.integration.googlemaps.GoogleMapsPlace;
import com.xtremehiphopwithtash.book.service.integration.googlemaps.GoogleMapsService;
import java.util.List;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class LocationResolver {

	private final LocationService locationService;
	private final Auth0JwtService auth0JwtService;
	private final GoogleMapsService googleMapsService;

	public LocationResolver(
		LocationService locationService,
		GoogleMapsService googleMapsService,
		Auth0JwtService auth0JwtService
	) {
		this.locationService = locationService;
		this.googleMapsService = googleMapsService;
		this.auth0JwtService = auth0JwtService;
	}

	@QueryMapping
	public List<Location> getLocations(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		List<Location> locations = locationService.retreiveAll();

		return locations.isEmpty() ? null : locations;
	}

	@QueryMapping
	public Location getLocationByID(@Argument UUID locationID) {
		return locationService.retreiveByID(locationID);
	}

	@MutationMapping
	public Location createLocation(@Argument LocationInput input, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return locationService.create(input);
	}

	@MutationMapping
	public Location updateLocationByID(
		@Argument UUID locationID,
		@Argument LocationInput input,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);

		return locationService.updateByID(locationID, input);
	}

	@MutationMapping
	public UUID deleteLocationByID(@Argument UUID locationID, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return locationService.deleteByID(locationID);
	}

	@QueryMapping
	public GoogleMapsPlace searchPlaceByName(@Argument String name, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return googleMapsService.searchPlaceByName(name);
	}

	@SchemaMapping(typeName = "Location", field = "coordinates")
	public GoogleMapsCoordinates getCoordinates(Location location) {
		OpenLocationCode code = new OpenLocationCode(location.getPlusCode());
		CodeArea area = code.decode();
		return new GoogleMapsCoordinates(area.getCenterLatitude(), area.getCenterLongitude());
	}

	@QueryMapping
	public GoogleMapsCoordinates decodePlusCode(@Argument String plusCode) {
		try {
			OpenLocationCode olc = new OpenLocationCode(plusCode);
			CodeArea decode = olc.decode();
			return new GoogleMapsCoordinates(decode.getCenterLatitude(), decode.getCenterLongitude());
		} catch (Exception e) {
			throw new IllegalArgumentException("Invalid plus code: " + plusCode);
		}
	}
}
