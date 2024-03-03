package com.xtremehiphopwithtash.book.service.integration.stripe.module;

import com.stripe.exception.StripeException;
import com.stripe.param.CustomerListParams;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeClient;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import org.springframework.stereotype.Service;

@Service
public class StripeHealthCheckModule {

	private final StripeClient stripeClient;

	StripeHealthCheckModule(StripeClient stripeClient) {
		this.stripeClient = stripeClient;
	}

	private final CustomerListParams healthCheckParams = CustomerListParams.builder().setLimit(1L).build();

	public String check() {
		try {
			stripeClient.customers().list(healthCheckParams);
			return "OK";
		} catch (StripeException se) {
			throw new ResolverException("Unable to connect to Stripe", se);
		}
	}
}
