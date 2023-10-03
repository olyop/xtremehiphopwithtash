package com.xtremehiphopwithtash.book.service.integration.aws;

import java.time.Duration;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.client.config.ClientOverrideConfiguration;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Bucket;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class AwsS3Client {

	private final S3Client s3Client;

	public AwsS3Client(
		@Value("${aws.access.key}") String accessKey,
		@Value("${aws.secret.key}") String secretKey,
		@Value("${aws.region.id}") String region,
		@Value("${aws.client.timeout}") int clientTimeout
	) {
		AwsCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
		AwsCredentialsProvider credentialsProvider = StaticCredentialsProvider.create(credentials);

		ClientOverrideConfiguration configuration = ClientOverrideConfiguration
			.builder()
			.apiCallTimeout(Duration.ofMillis(clientTimeout))
			.build();

		this.s3Client =
			S3Client
				.builder()
				.credentialsProvider(credentialsProvider)
				.region(Region.of(region))
				.overrideConfiguration(configuration)
				.build();
	}

	public List<Bucket> listBuckets() {
		return s3Client.listBuckets().buckets();
	}

	public void uploadFile(String bucketName, String key, ObjectCannedACL acl, byte[] bytes) {
		PutObjectRequest request = PutObjectRequest.builder().bucket(bucketName).key(key).acl(acl).build();

		RequestBody body = RequestBody.fromBytes(bytes);

		s3Client.putObject(request, body);
	}
}
