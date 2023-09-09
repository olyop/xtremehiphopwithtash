package com.xtremehiphopwithtash.book.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.StudentService;
import com.xtremehiphopwithtash.book.service.stripe.StripeService;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
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
	private final ObjectMapper objectMapper;

	public StripeController(StripeService stripeService, StudentService studentService, BookingService bookingService) {
		this.stripeService = stripeService;
		this.bookingService = bookingService;
		this.studentService = studentService;

		this.objectMapper = new ObjectMapper();
		this.objectMapper.registerModule(new Jdk8Module());
	}

	@PostMapping("/webhook")
	public void handleWebHook(@RequestHeader("Stripe-Signature") String signature, @RequestBody String payload)
		throws JsonMappingException, JsonProcessingException {
		Event event = stripeService.webhook().constructPaymentEvent(payload, signature);
		StripeObject stripeObject = stripeService.webhook().constructObject(event);

		if (event.getType().equals("payment_intent.succeeded")) {
			PaymentIntent paymentIntent = (PaymentIntent) stripeObject;

			String studentID = paymentIntent.getMetadata().get("studentID");
			String bookingInputJson = paymentIntent.getMetadata().get("bookingInput");

			if (studentID == null || bookingInputJson == null) {
				return;
			}

			validatePaymentIntentCustomerIdMatches(studentID, paymentIntent);

			BookingInput bookingInput = objectMapper.readValue(bookingInputJson, BookingInput.class);

			bookingService.create(bookingInput, studentID, paymentIntent, false);
		}
	}

	private void validatePaymentIntentCustomerIdMatches(String studentID, PaymentIntent paymentIntent) {
		Student student = studentService.retreiveByID(studentID);

		if (!paymentIntent.getCustomer().equals(student.getStripeCustomerID())) {
			throw new ResolverException("Payment intent customer ID does not match student");
		}
	}
}
