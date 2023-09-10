package com.xtremehiphopwithtash.book.service.integration.stripe;

import com.stripe.StripeClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeClientCustom {

	private final StripeClient client;

	public StripeClientCustom(@Value("${stripe.live.key}") String secretKey) {
		this.client = new StripeClient(secretKey);
	}

	public StripeClient client() {
		return client;
	}
}
