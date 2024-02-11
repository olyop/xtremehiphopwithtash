package com.xtremehiphopwithtash.book.other;

import java.util.UUID;

public class CreatePaymentIntentResponse {

	private String clientSecret;
	private UUID bookingID;
	private boolean isLiveMode;

	public String getClientSecret() {
		return clientSecret;
	}

	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}

	public UUID getBookingID() {
		return bookingID;
	}

	public void setBookingID(UUID bookingID) {
		this.bookingID = bookingID;
	}

	public boolean isLiveMode() {
		return isLiveMode;
	}

	public void setLiveMode(boolean isLiveMode) {
		this.isLiveMode = isLiveMode;
	}
}
