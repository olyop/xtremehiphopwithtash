package com.xtremehiphopwithtash.book.service.integration.stripe;

import com.stripe.model.Product;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;

public class StripeProductValidationException extends ResolverException {

	StripeProductValidationException(String message, Product product) {
		super(String.format("Product '%s' %s", product.getName(), message));
	}
}
