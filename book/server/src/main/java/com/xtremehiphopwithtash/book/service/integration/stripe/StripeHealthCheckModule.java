package com.xtremehiphopwithtash.book.service.integration.stripe;

import com.stripe.exception.StripeException;
import com.stripe.param.CustomerListParams;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import org.springframework.stereotype.Service;

@Service
public class StripeHealthCheckModule {

	private final StripeClientCustom stripeClient;

	StripeHealthCheckModule(StripeClientCustom stripeClient) {
		this.stripeClient = stripeClient;
	}

	private final CustomerListParams healthCheckParams = CustomerListParams.builder().setLimit(1L).build();

	public void check() {
		try {
			stripeClient.client().customers().list(healthCheckParams);
		} catch (StripeException se) {
			throw new ResolverException("Unable to connect to Stripe");
		}
	}
}
