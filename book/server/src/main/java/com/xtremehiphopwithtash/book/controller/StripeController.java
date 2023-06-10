package com.xtremehiphopwithtash.book.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.StripeService;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StripeController {

	private final StripeService stripeService;
	private final BookingService bookingService;
	private final ObjectMapper objectMapper;

	public StripeController(StripeService stripeService, BookingService bookingService) {
		this.stripeService = stripeService;
		this.bookingService = bookingService;

		this.objectMapper = new ObjectMapper();
		this.objectMapper.registerModule(new Jdk8Module());
	}

	@PostMapping("/stripe/webhook")
	public void handleWebHook(
		@RequestHeader("Stripe-Signature") String signature,
		@RequestBody String payload
	) {
		Event event = stripeService.createPaymentEvent(payload, signature);
		StripeObject stripeObject = stripeService.constructObject(event);

		if (event.getType().equals("payment_intent.succeeded")) {
			try {
				PaymentIntent paymentIntent = (PaymentIntent) stripeObject;

				Map<String, String> metadata = paymentIntent.getMetadata();

				String studentID = metadata.get("studentID");
				String bookingInputJson = metadata.get("bookingInput");

				BookingInput bookingInput = objectMapper.readValue(bookingInputJson, BookingInput.class);

				bookingService.createBooking(bookingInput, studentID, paymentIntent);
			} catch (Exception e) {
				e.printStackTrace();
				throw new IllegalArgumentException("Invalid payment intent");
			}
		}
	}
}
