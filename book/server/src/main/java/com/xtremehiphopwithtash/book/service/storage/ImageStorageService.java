package com.xtremehiphopwithtash.book.service.storage;

import com.xtremehiphopwithtash.book.service.integration.aws.AwsS3Client;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
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

@Service
public class ImageStorageService {

	private final String baseUrl;
	private final String s3BucketName;
	private final String s3FolderName;

	private final AwsS3Client awsS3Client;

	private final Tika tika;

	private final int portraitImageWidth;
	private final int portraitImageHeight;
	private final int landscapeImageWidth;
	private final int landscapeImageHeight;
	private final Positions cropPosition;
	private final String outputFormat;
	private final double outputQuality;

	ImageStorageService(
		@Value("${imagestorage.base.url}") String baseUrl,
		@Value("${imagestorage.s3.bucket.name}") String s3BucketName,
		@Value("${imageservice.s3.folder.name}") String s3FolderName,
		AwsS3Client awsS3Client
	) {
		this.baseUrl = baseUrl;
		this.s3BucketName = s3BucketName;
		this.s3FolderName = s3FolderName;

		this.awsS3Client = awsS3Client;

		this.tika = new Tika();

		this.portraitImageWidth = 450;
		this.portraitImageHeight = 450;
		this.landscapeImageWidth = 1125;
		this.landscapeImageHeight = 450;
		this.cropPosition = Positions.TOP_LEFT;
		this.outputFormat = "JPEG";
		this.outputQuality = 1.0;
	}

	public URL upload(byte[] bytes, boolean isLandscape) {
		validateFile(bytes);

		bytes = resizeImage(bytes, isLandscape);

		String key = generateS3Key();

		awsS3Client.uploadFile(s3BucketName, key, bytes);

		return constructUrl(key);
	}

	private void validateFile(byte[] bytes) {
		try {
			String mimeType = tika.detect(bytes);

			if (!mimeType.startsWith("image/jpeg")) {
				throw new ResolverException("File is not a jpeg");
			}
		} catch (Exception e) {
			throw new ResolverException("Failed to validate file", e);
		}
	}

	/*
	 * Resize image to 1125x450 (5:2 aspect ratio)
	 * and crop from the top left corner.
	 */
	private byte[] resizeImage(byte[] bytes, boolean isLandscape) {
		try {
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

			int width = isLandscape ? landscapeImageWidth : portraitImageWidth;
			int height = isLandscape ? landscapeImageHeight : portraitImageHeight;

			Thumbnails
				.of(new ByteArrayInputStream(bytes))
				.size(width, height)
				.crop(cropPosition)
				.outputFormat(outputFormat)
				.outputQuality(outputQuality)
				.toOutputStream(outputStream);

			return outputStream.toByteArray();
		} catch (Exception e) {
			throw new ResolverException("Failed to resize image", e);
		}
	}

	private String generateS3Key() {
		return String.format("%s/%s.jpg", s3FolderName, UUID.randomUUID());
	}

	private URL constructUrl(String key) {
		try {
			return URI.create(baseUrl + key).toURL();
		} catch (MalformedURLException e) {
			throw new ResolverException("Failed to create URL", e);
		}
	}
}
