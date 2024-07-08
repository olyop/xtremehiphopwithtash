package com.xtremehiphopwithtash.book.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.xtremehiphopwithtash.book.graphql.input.BookingInput;
import com.xtremehiphopwithtash.book.other.ObjectMapperCustom;
import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.database.student.Student;
import com.xtremehiphopwithtash.book.service.database.student.StudentService;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeService;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stripe")
@CrossOrigin(origins = "*")
public class StripeController {

	private final StripeService stripeService;
	private final BookingService bookingService;
	private final StudentService studentService;
	private final ObjectMapperCustom objectMapperCustom;

	public StripeController(
		StripeService stripeService,
		StudentService studentService,
		BookingService bookingService,
		ObjectMapperCustom objectMapperCustom
	) {
		this.stripeService = stripeService;
		this.bookingService = bookingService;
		this.studentService = studentService;
		this.objectMapperCustom = objectMapperCustom;
	}

	@PostMapping("/webhook")
	public void handleWebHook(@RequestHeader("Stripe-Signature") String signature, @RequestBody String payload) {
		Event event = stripeService.webhook().constructPaymentEvent(payload, signature);

		StripeObject stripeObject = stripeService.webhook().constructObject(event);

		if (event.getType().equals("payment_intent.succeeded")) {
			handlePaymentIntentSucceeded((PaymentIntent) stripeObject);
		} else {
			throw new ResolverException("Unhandled event type");
		}
	}

	private void handlePaymentIntentSucceeded(PaymentIntent paymentIntent) {
		String studentID = paymentIntent.getMetadata().get("studentID");
		String bookingInputJson = paymentIntent.getMetadata().get("bookingInput");
		String bookingIDJson = paymentIntent.getMetadata().get("bookingID");

		validateMetadata(studentID, bookingInputJson, bookingIDJson);
		validatePaymentIntentCustomerIdMatches(studentID, paymentIntent);

		BookingInput bookingInput = parseBookingInput(bookingInputJson);
		UUID bookingID = parseBookingID(bookingIDJson);

		bookingService.create(bookingInput, bookingID, studentID, paymentIntent, false);
	}

	private void validateMetadata(String studentID, String bookingInputJson, String bookingIDJson) {
		if (studentID == null) {
			throw new ResolverException("Payment intent metadata missing student ID");
		}

		if (bookingInputJson == null) {
			throw new ResolverException("Payment intent metadata missing booking input");
		}

		if (bookingIDJson == null) {
			throw new ResolverException("Payment intent metadata missing booking ID");
		}
	}

	private void validatePaymentIntentCustomerIdMatches(String studentID, PaymentIntent paymentIntent) {
		Student student = studentService.retreiveByID(studentID);

		if (!paymentIntent.getCustomer().equals(student.getStripeCustomerID())) {
			throw new ResolverException("Payment intent customer ID does not match student");
		}
	}

	private BookingInput parseBookingInput(String bookingInputJson) {
		try {
			return objectMapperCustom.instance().readValue(bookingInputJson, BookingInput.class);
		} catch (JsonProcessingException jpe) {
			throw new ResolverException("Unable to parse booking input", jpe);
		}
	}

	private UUID parseBookingID(String bookingIDJson) {
		try {
			return UUID.fromString(bookingIDJson);
		} catch (IllegalArgumentException iae) {
			throw new ResolverException("Unable to parse booking ID", iae);
		}
	}
}
