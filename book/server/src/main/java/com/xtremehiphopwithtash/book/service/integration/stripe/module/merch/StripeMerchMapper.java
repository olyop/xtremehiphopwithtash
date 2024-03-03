package com.xtremehiphopwithtash.book.service.integration.stripe.module.merch;

import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeClient;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.time.Instant;
import java.util.Arrays;

class StripeMerchMapper {

	private final StripeClient stripeClient;

	StripeMerchMapper(StripeClient stripeClient) {
		this.stripeClient = stripeClient;
	}

	StripeMerchItem productToMerchItem(Product product) {
		StripeMerchItem merchItem = new StripeMerchItem();

		merchItem.setMerchItemID(product.getId());
		merchItem.setName(product.getName());
		merchItem.setDescription(product.getDescription());
		merchItem.setPhoto(mapPhoto(product));
		merchItem.setPrice(mapPrice(product));
		merchItem.setInStock(mapIsInStock(product));
		merchItem.setIsLowStock(mapIsLowStock(product));
		merchItem.setIsPreOrder(mapIsPreOrder(product));
		merchItem.setSizesAvailable(mapSizesAvailable(product));
		merchItem.setUpdatedAt(mapUpdatedAt(product));

		return merchItem;
	}

	private URL mapPhoto(Product product) {
		try {
			return URI.create(product.getImages().get(0)).toURL();
		} catch (MalformedURLException mue) {
			throw new StripeMerchProductValidationException("Unable to retrieve photo", product, mue);
		}
	}

	private Integer mapPrice(Product product) {
		try {
			Price price = stripeClient.prices().retrieve(product.getDefaultPrice());

			return price.getUnitAmount().intValue();
		} catch (StripeException se) {
			throw new StripeMerchProductValidationException("Unable to retrieve price", product, se);
		}
	}

	private boolean mapIsInStock(Product product) {
		int stock = Integer.valueOf(product.getMetadata().get("stock").trim());

		return stock > 0;
	}

	private boolean mapIsLowStock(Product product) {
		return Boolean.parseBoolean(product.getMetadata().get("lowStock").trim());
	}

	private boolean mapIsPreOrder(Product product) {
		return Boolean.parseBoolean(product.getMetadata().get("preOrder").trim());
	}

	private String[] mapSizesAvailable(Product product) {
		String[] sizesAvailable = product.getMetadata().get("sizesAvailable").trim().split(",");

		return Arrays.stream(sizesAvailable).map(String::trim).toArray(String[]::new);
	}

	private Instant mapUpdatedAt(Product product) {
		return Instant.ofEpochSecond(product.getUpdated());
	}
}
