package com.xtremehiphopwithtash.book.service.database.location;

import com.xtremehiphopwithtash.book.graphql.input.LocationInput;
import com.xtremehiphopwithtash.book.service.helpers.CommonTransform;
import com.xtremehiphopwithtash.book.service.helpers.InputMapper;
import org.springframework.stereotype.Component;

@Component
public class LocationInputMapper implements InputMapper<LocationInput, Location> {

	@Override
	public Location map(LocationInput input) {
		Location location = new Location();

		location.setName(CommonTransform.transformName(input.name()));
		location.setPlusCode(input.plusCode());
		location.setAddress(input.address());

		return location;
	}
}
