package com.xtremehiphopwithtash.book.service.integration.googlemaps;

public class GoogleMapsCoordinates {

	private double latitude;
	private double longitude;

	public GoogleMapsCoordinates(double latitude, double longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public double getLongitude() {
		return longitude;
	}
}
