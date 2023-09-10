package com.xtremehiphopwithtash.book.service.googlemaps;

public class GoogleMapsPlace {

	private final String address;
	private final String plusCode;
	private final GoogleMapsCoordinates coordinates;

	public GoogleMapsPlace(String address, String plusCode, GoogleMapsCoordinates coordinates) {
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

	public GoogleMapsCoordinates getCoordinates() {
		return coordinates;
	}
}
