package com.xtremehiphopwithtash.book.resolver.mapper;

import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.resolver.input.LocationInput;
import com.xtremehiphopwithtash.book.resolver.transform.CommonTransform;
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
