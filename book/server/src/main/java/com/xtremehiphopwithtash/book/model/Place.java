package com.xtremehiphopwithtash.book.model;

import com.xtremehiphopwithtash.book.other.Coordinates;

public class Place {

	private final String address;
	private final String plusCode;
	private final Coordinates coordinates;

	public Place(String address, String plusCode, Coordinates coordinates) {
		this.address = address;
		this.plusCode = plusCode;
		this.coordinates = coordinates;
	}

	public String getAddress() {
		return address;
	}

	public String getPlusCode() {
		return plusCode;
	}

	public Coordinates getCoordinates() {
		return coordinates;
	}
}
