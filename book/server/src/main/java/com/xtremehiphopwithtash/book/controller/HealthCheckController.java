package com.xtremehiphopwithtash.book.controller;

import com.xtremehiphopwithtash.book.service.database.classdescription.ClassDescriptionService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0ManagementService;
import com.xtremehiphopwithtash.book.service.integration.aws.AwsS3Client;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeService;
import java.util.concurrent.CompletableFuture;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

	private final AwsS3Client awsS3Client;
	private final StripeService stripeService;
	private final Auth0ManagementService auth0ManagementService;
	private final ClassDescriptionService classDescriptionService;

	public HealthCheckController(
		AwsS3Client awsS3Client,
		StripeService stripeService,
		Auth0ManagementService auth0ManagementService,
		ClassDescriptionService classDescriptionService
	) {
		this.awsS3Client = awsS3Client;
		this.stripeService = stripeService;
		this.auth0ManagementService = auth0ManagementService;
		this.classDescriptionService = classDescriptionService;
	}

	@GetMapping
	public String check() {
		CompletableFuture
			.allOf(
				CompletableFuture.supplyAsync(() -> classDescriptionService.getValue()),
				CompletableFuture.supplyAsync(() -> stripeService.healthCheck().check()),
				CompletableFuture.supplyAsync(() -> awsS3Client.listBuckets()),
				CompletableFuture.supplyAsync(() -> auth0ManagementService.listApplications())
			)
			.join();

		return "OK";
	}
}
