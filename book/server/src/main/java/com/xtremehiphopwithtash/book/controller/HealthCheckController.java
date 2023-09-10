package com.xtremehiphopwithtash.book.controller;

import com.xtremehiphopwithtash.book.service.database.instructor.InstructorService;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

	private final InstructorService instructorService;
	private final StripeService stripeService;

	public HealthCheckController(InstructorService instructorService, StripeService stripeService) {
		this.instructorService = instructorService;
		this.stripeService = stripeService;
	}

	@GetMapping
	public String check() {
		instructorService.retreiveAll();
		stripeService.healthCheck().check();

		return "OK";
	}
}
