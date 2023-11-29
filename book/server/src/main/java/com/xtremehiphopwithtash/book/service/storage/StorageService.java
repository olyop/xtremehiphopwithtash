package com.xtremehiphopwithtash.book.service.storage;

import com.xtremehiphopwithtash.book.service.integration.aws.AwsS3Client;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.UUID;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;

@Service
public class StorageService {

	private final String s3BucketName;
	private final String s3BucketFolder;
	private final String cloudfrontBaseUrl;

	private final AwsS3Client awsS3Client;
	private final ObjectCannedACL acl;

	private final Tika tika;

	private final int portraitImageWidth;
	private final int portraitImageHeight;
	private final int landscapeImageWidth;
	private final int landscapeImageHeight;

	StorageService(
		@Value("${storage.s3.bucket.name}") String s3BucketName,
		@Value("${storage.s3.bucket.folder}") String s3BucketFolder,
		@Value("${storage.cloudfront.base.url}") String cloudfrontBaseUrl,
		AwsS3Client awsS3Client
	) {
		this.s3BucketName = s3BucketName;
		this.s3BucketFolder = s3BucketFolder;
		this.cloudfrontBaseUrl = cloudfrontBaseUrl;

		this.awsS3Client = awsS3Client;
		this.acl = ObjectCannedACL.PUBLIC_READ;

		this.tika = new Tika();

		this.portraitImageWidth = 450;
		this.portraitImageHeight = 450;
		this.landscapeImageWidth = 1125;
		this.landscapeImageHeight = 450;
	}

	public URL upload(byte[] bytes, boolean isLandscape) {
		validateFile(bytes);

		bytes = resizeImage(bytes, isLandscape);

		UUID amazonFileId = UUID.randomUUID();

		String key = constructS3Key(amazonFileId);

		awsS3Client.uploadFile(s3BucketName, key, acl, bytes);

		return constructCloudfrontUrl(cloudfrontBaseUrl, key);
	}

	private void validateFile(byte[] bytes) {
		try {
			String mimeType = tika.detect(bytes);

			if (!mimeType.startsWith("image/jpeg")) {
				throw new RuntimeException("File is not a jpeg");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Failed to validate file", e);
		}
	}

	/*
	 * Resize image to 1125x450 (5:2 aspect ratio)
	 * and crop from the top left corner.
	 */
	private byte[] resizeImage(byte[] bytes, boolean isLandscape) {
		try {
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

			Thumbnails
				.of(new ByteArrayInputStream(bytes))
				.size(
					isLandscape ? landscapeImageWidth : portraitImageWidth,
					isLandscape ? landscapeImageHeight : portraitImageHeight
				)
				.crop(Positions.TOP_LEFT)
				.outputFormat("JPEG")
				.outputQuality(1.0)
				.toOutputStream(outputStream);

			return outputStream.toByteArray();
		} catch (Exception e) {
			throw new RuntimeException("Failed to resize image", e);
		}
	}

	private String constructS3Key(UUID amazonFileId) {
		return String.format("%s/%s.jpg", s3BucketFolder, amazonFileId);
	}

	private URL constructCloudfrontUrl(String baseUrl, String key) {
		try {
			return URI.create(String.format("%s/%s", baseUrl, key)).toURL();
		} catch (MalformedURLException e) {
			throw new RuntimeException("Failed to create URL", e);
		}
	}
}
