package com.xtremehiphopwithtash.book.service.integration.aws;

import java.util.List;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Bucket;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class AwsS3Client {

	private final S3Client s3Client;

	public AwsS3Client(AwsClientHelpers awsClientHelpers) {
		this.s3Client =
			S3Client
				.builder()
				.credentialsProvider(awsClientHelpers.credentialsProvider())
				.region(awsClientHelpers.region())
				.overrideConfiguration(awsClientHelpers.configuration())
				.build();
	}

	public List<Bucket> listBuckets() {
		return s3Client.listBuckets().buckets();
	}

	public void uploadFile(String bucketName, String key, byte[] bytes) {
		PutObjectRequest request = PutObjectRequest
			.builder()
			.bucket(bucketName)
			.key(key)
			.cacheControl("max-age=31536000")
			.build();

		RequestBody body = RequestBody.fromBytes(bytes);

		s3Client.putObject(request, body);
	}
}
