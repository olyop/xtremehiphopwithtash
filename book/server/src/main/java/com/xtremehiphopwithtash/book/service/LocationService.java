package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.resolver.input.LocationInput;
import com.xtremehiphopwithtash.book.service.dao.LocationDAO;
import com.xtremehiphopwithtash.book.service.inputmapper.LocationInputMapper;
import com.xtremehiphopwithtash.book.service.inter.EntityServiceInter;
import com.xtremehiphopwithtash.book.service.validator.LocationValidator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class LocationService implements EntityServiceInter<Location, LocationInput, UUID> {

	private final LocationDAO locationDAO;
	private final LocationValidator validator;
	private final LocationInputMapper inputMapper;

	public LocationService(
		LocationDAO locationDAO,
		LocationValidator validator,
		LocationInputMapper inputMapper
	) {
		this.locationDAO = locationDAO;
		this.validator = validator;
		this.inputMapper = inputMapper;
	}

	@Override
	public List<Location> retreiveAll() {
		return locationDAO.select();
	}

	@Override
	public Location retreiveByID(UUID locationID) {
		validator.validateID(locationID);

		return locationDAO.selectByID(locationID);
	}

	@Override
	public Location create(LocationInput input) {
		validator.validateInput(input);

		Location location = inputMapper.map(input);

		return locationDAO.insert(location);
	}

	@Override
	public Location updateByID(UUID locationID, LocationInput input) {
		validator.validateUpdate(locationID, input);

		Location location = inputMapper.map(input);

		return locationDAO.updateByID(locationID, location);
	}

	@Override
	public UUID deleteByID(UUID locationID) {
		validator.validateDelete(locationID);

		locationDAO.deleteByID(locationID);

		return locationID;
	}

	@Override
	public boolean existsByID(UUID locationID) {
		return locationDAO.existsByID(locationID);
	}

	public boolean existsByName(String name, String plusCode, String address) {
		return locationDAO.checkForDuplicate(name, plusCode, address);
	}
}
