package com.xtremehiphopwithtash.book.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentCreateParams.AutomaticPaymentMethods;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.CreatePaymentIntentResponse;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import java.lang.module.ResolutionException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

	private final String currency = "AUD";

	private final String webhookSecret;
	private final ObjectMapper objectMapper;

	private final BookingService bookingService;
	private final SessionService sessionService;

	public StripeService(
		@Value("${stripe.live.key}") String secretKey,
		@Value("${stripe.webhook.secret}") String webhookSecret,
		BookingService bookingService,
		SessionService sessionService
	) {
		Stripe.apiKey = secretKey;

		this.webhookSecret = webhookSecret;
		this.objectMapper = new ObjectMapper();
		this.objectMapper.registerModule(new Jdk8Module());
		this.bookingService = bookingService;
		this.sessionService = sessionService;
	}

	public String createCustomer(String studentID, Details details) {
		try {
			String name = String.format("%s %s", details.getFirstName(), details.getLastName());

			Map<String, String> metadata = new HashMap<>();
			metadata.put("studentID", studentID);

			CustomerCreateParams params = CustomerCreateParams
				.builder()
				.setName(name)
				.setEmail(details.getEmailAddress())
				.setPhone(details.getMobilePhoneNumber())
				.setMetadata(metadata)
				.build();

			Customer customer = Customer.create(params);

			return customer.getId();
		} catch (StripeException se) {
			throw new ResolutionException("Unable to create customer");
		}
	}

	public CreatePaymentIntentResponse createPaymentIntent(
		BookingInput bookingInput,
		String studentID,
		String emailAddress,
		String stripeCustomerID,
		String bookingDescription
	) {
		try {
			Session session = sessionService.retreiveByID(bookingInput.sessionID());
			BookingCost bookingCost = bookingService.getBookingCost(bookingInput, session);

			long amount = bookingCost.getFinalCost();

			Map<String, String> metadata = new HashMap<>();

			metadata.put("studentID", studentID);
			metadata.put("bookingInput", objectMapper.writeValueAsString(bookingInput));

			AutomaticPaymentMethods automaticPaymentMethods = AutomaticPaymentMethods.builder().setEnabled(true).build();

			PaymentIntentCreateParams params = PaymentIntentCreateParams
				.builder()
				.setCurrency(currency)
				.setAmount(amount)
				.setCustomer(stripeCustomerID)
				.setReceiptEmail(emailAddress)
				.setDescription(bookingDescription)
				.setAutomaticPaymentMethods(automaticPaymentMethods)
				.putAllMetadata(metadata)
				.build();

			PaymentIntent paymentIntent = PaymentIntent.create(params);

			return new CreatePaymentIntentResponse(paymentIntent.getClientSecret());
		} catch (StripeException e) {
			e.printStackTrace();
			throw new ResolutionException("Unable to create payment intent");
		} catch (Exception e) {
			e.printStackTrace();
			throw new ResolutionException("Unable to parse booking input");
		}
	}

	public Event createPaymentEvent(String payload, String signature) {
		try {
			return Webhook.constructEvent(payload, signature, webhookSecret);
		} catch (Exception e) {
			throw new ResolutionException("Unable to parse webhook payload");
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
