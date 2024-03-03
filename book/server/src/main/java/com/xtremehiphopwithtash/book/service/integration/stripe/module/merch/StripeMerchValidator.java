package com.xtremehiphopwithtash.book.service.integration.stripe.module.merch;

import com.stripe.model.Product;

public class StripeMerchValidator {

	void validateProduct(Product product) {
		validateProductImages(product);
		validateProductMetadata(product);
	}

	private void validateProductImages(Product product) {
		if (product.getImages().isEmpty()) {
			throw new StripeMerchProductValidationException("images are not set", product);
		}
	}

	private void validateProductMetadata(Product product) {
		validateProductMetadataBooleanValue("show", product);
		validateProductMetadataBooleanValue("preOrder", product);
		validateProductMetadataValue("sizesAvailable", product);
		validateProductMetadataIntegerValue("stock", product);
		validateProductMetadataBooleanValue("lowStock", product);
	}

	private void validateProductMetadataValue(String key, Product product) {
		if (product.getMetadata().get(key) == null) {
			throw new StripeMerchProductValidationException(String.format("metadata '%s' is not set", key), product);
		}
	}

	private void validateProductMetadataBooleanValue(String key, Product product) {
		validateProductMetadataValue(key, product);

		if (
			!(product.getMetadata().get(key).trim().equals("true") || product.getMetadata().get(key).trim().equals("false"))
		) {
			throw new StripeMerchProductValidationException(String.format("metadata '%s' is not a boolean", key), product);
		}
	}

	private void validateProductMetadataIntegerValue(String key, Product product) {
		validateProductMetadataValue(key, product);

		try {
			Integer.parseInt(product.getMetadata().get(key).trim());
		} catch (NumberFormatException nfe) {
			throw new StripeMerchProductValidationException(
				String.format("metadata '%s' is not a number", key),
				product,
				nfe
			);
		}
	}
}
