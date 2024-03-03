package com.xtremehiphopwithtash.book.service.integration.stripe.module.merch;

import com.stripe.model.Product;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;

class StripeMerchProductValidationException extends ResolverException {

	StripeMerchProductValidationException(String message, Product product) {
		super(formatErrorMessage(message, product));
	}

	StripeMerchProductValidationException(String message, Product product, Throwable cause) {
		super(formatErrorMessage(message, product), cause);
	}

	private static String formatErrorMessage(String message, Product product) {
		return String.format("Product '%s' %s", product.getName(), message);
	}
}
