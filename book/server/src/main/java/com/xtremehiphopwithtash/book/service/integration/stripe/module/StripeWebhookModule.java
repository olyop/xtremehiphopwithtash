package com.xtremehiphopwithtash.book.service.integration.stripe.module;

import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import java.lang.module.ResolutionException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeWebhookModule {

	private final String webhookSecret;

	StripeWebhookModule(@Value("${stripe.webhook.secret}") String webhookSecret) {
		this.webhookSecret = webhookSecret;
	}

	public Event constructPaymentEvent(String payload, String signature) {
		try {
			return Webhook.constructEvent(payload, signature, webhookSecret);
		} catch (Exception e) {
			throw new ResolutionException("Unable to parse webhook payload", e);
		}
	}

	public StripeObject constructObject(Event event) {
		StripeObject stripeObject = null;

		EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

		if (dataObjectDeserializer.getObject().isPresent()) {
			stripeObject = dataObjectDeserializer.getObject().get();
		} else {
			throw new IllegalArgumentException("Invalid object");
		}

		return stripeObject;
	}
}
