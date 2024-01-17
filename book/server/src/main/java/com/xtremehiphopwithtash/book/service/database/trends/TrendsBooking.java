package com.xtremehiphopwithtash.book.service.database.trends;

import java.time.Instant;

public class TrendsBooking {

	private int bookings;
	private Instant unixDay;

	public TrendsBooking() {}

	public TrendsBooking(int bookings, Instant unixDay) {
		this.bookings = bookings;
		this.unixDay = unixDay;
	}

	public int getBookings() {
		return bookings;
	}

	public void setBookings(int bookings) {
		this.bookings = bookings;
	}

	public Instant getUnixDay() {
		return unixDay;
	}

	public void setUnixDay(Instant unixDay) {
		this.unixDay = unixDay;
	}
}
