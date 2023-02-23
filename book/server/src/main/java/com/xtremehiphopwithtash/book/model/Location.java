package com.xtremehiphopwithtash.book.model;

import java.util.UUID;

public class Location extends Base {

	private UUID locationID;
	private String name;
	private String plusCode;

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
}
