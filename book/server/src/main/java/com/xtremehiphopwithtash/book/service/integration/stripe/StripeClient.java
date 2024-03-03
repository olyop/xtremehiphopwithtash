package com.xtremehiphopwithtash.book.service.integration.stripe;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeClient extends com.stripe.StripeClient {

	public StripeClient(@Value("${stripe.live.key}") String secretKey) {
		super(secretKey);
	}
}
