package com.xtremehiphopwithtash.book.service.integration.aws;

import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.client.config.ClientOverrideConfiguration;
import software.amazon.awssdk.regions.Region;

@Service
public class AwsClientHelpers {

	private final Region region;
	private final AwsCredentialsProvider credentialsProvider;
	private final ClientOverrideConfiguration configuration;

	public AwsClientHelpers(
		@Value("${aws.region.id}") String region,
		@Value("${aws.access.key}") String accessKey,
		@Value("${aws.secret.key}") String secretKey,
		@Value("${aws.client.timeout}") int clientTimeout
	) {
		this.region = Region.of(region);
		this.credentialsProvider = StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey));
		this.configuration = ClientOverrideConfiguration.builder().apiCallTimeout(Duration.ofMillis(clientTimeout)).build();
	}

	public Region region() {
		return region;
	}

	public AwsCredentialsProvider credentialsProvider() {
		return credentialsProvider;
	}

	public ClientOverrideConfiguration configuration() {
		return configuration;
	}
}
