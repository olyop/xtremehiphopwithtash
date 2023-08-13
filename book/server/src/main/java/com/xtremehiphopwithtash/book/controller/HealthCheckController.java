package com.xtremehiphopwithtash.book.controller;

import com.xtremehiphopwithtash.book.service.InstructorService;
import com.xtremehiphopwithtash.book.service.StripeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

	private final String healthMessage = "OK";

	private final InstructorService instructorService;
	private final StripeService stripeService;

	public HealthCheckController(InstructorService instructorService, StripeService stripeService) {
		this.instructorService = instructorService;
		this.stripeService = stripeService;
	}

	@GetMapping
	public String health() {
		instructorService.retreiveAll();
		stripeService.healthCheck();

		return healthMessage;
	}
}
