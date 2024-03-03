package com.xtremehiphopwithtash.book.service.integration.stripe;

import com.xtremehiphopwithtash.book.service.integration.stripe.module.StripeCustomerModule;
import com.xtremehiphopwithtash.book.service.integration.stripe.module.StripeHealthCheckModule;
import com.xtremehiphopwithtash.book.service.integration.stripe.module.StripePaymentIntentModule;
import com.xtremehiphopwithtash.book.service.integration.stripe.module.StripeWebhookModule;
import com.xtremehiphopwithtash.book.service.integration.stripe.module.merch.StripeMerchModule;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

	// modules
	private final StripeMerchModule merch;
	private final StripeHealthCheckModule healthCheck;
	private final StripeCustomerModule customer;
	private final StripeWebhookModule webhook;
	private final StripePaymentIntentModule paymentIntent;

	StripeService(
		StripeCustomerModule customer,
		StripeHealthCheckModule healthCheck,
		StripeMerchModule merch,
		StripePaymentIntentModule paymentIntent,
		StripeWebhookModule webhook
	) {
		this.customer = customer;
		this.healthCheck = healthCheck;
		this.merch = merch;
		this.paymentIntent = paymentIntent;
		this.webhook = webhook;
	}

	public StripeMerchModule merch() {
		return merch;
	}

	public StripeHealthCheckModule healthCheck() {
		return healthCheck;
	}

	public StripeCustomerModule customer() {
		return customer;
	}

	public StripeWebhookModule webhook() {
		return webhook;
	}

	public StripePaymentIntentModule paymentIntent() {
		return paymentIntent;
	}
}
