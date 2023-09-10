package com.xtremehiphopwithtash.book.service.database.location;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.util.UUID;

public class Location extends BaseModel {

	private UUID locationID;
	private String name;
	private String plusCode;
	private String address;

	public Location() {}

	public UUID getLocationID() {
		return locationID;
	}

	public void setLocationID(UUID locationID) {
		this.locationID = locationID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPlusCode() {
		return plusCode;
	}

	public void setPlusCode(String plusCode) {
		this.plusCode = plusCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
