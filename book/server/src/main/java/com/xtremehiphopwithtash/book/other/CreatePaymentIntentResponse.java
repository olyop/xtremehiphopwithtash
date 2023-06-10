package com.xtremehiphopwithtash.book.other;

public class CreatePaymentIntentResponse {

	private String clientSecret;

	public CreatePaymentIntentResponse(String clientSecret) {
		this.clientSecret = clientSecret;
	}

	public String getClientSecret() {
		return clientSecret;
	}
}
