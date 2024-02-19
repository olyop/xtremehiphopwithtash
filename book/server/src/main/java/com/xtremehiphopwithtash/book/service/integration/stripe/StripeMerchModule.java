package com.xtremehiphopwithtash.book.service.integration.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.StripeCollection;
import com.stripe.param.ProductListParams;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import org.springframework.stereotype.Service;

@Service
public class StripeMerchModule {

	private final StripeClientCustom stripeClient;

	StripeMerchModule(StripeClientCustom stripeClient) {
		this.stripeClient = stripeClient;
	}

	private final ProductListParams productListParams = ProductListParams.builder().setActive(true).build();

	public List<StripeMerchItem> retrieveAll() {
		try {
			StripeCollection<Product> productsCollection = stripeClient.client().products().list(productListParams);

			List<Product> products = productsCollection.getData();

			List<StripeMerchItem> merchItems = products
				.stream()
				.filter(productsFilter)
				.map(productToMerchItem)
				.sorted(merchItemNameComparator)
				.toList();

			return merchItems;
		} catch (StripeException se) {
			throw new ResolverException("Unable to retrieve products");
		}
	}

	private Predicate<Product> productsFilter = product -> {
		boolean active = product.getActive();

		boolean show = product.getMetadata().get("show") == null
			? false
			: Boolean.parseBoolean(product.getMetadata().get("show").trim());

		return active && show;
	};

	private Function<Product, StripeMerchItem> productToMerchItem = product -> {
		validateProduct(product);

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

		return merchItem;
	};

	private URL mapPhoto(Product product) {
		try {
			return URI.create(product.getImages().get(0)).toURL();
		} catch (MalformedURLException mue) {
			throw new StripeProductValidationException("Unable to retrieve photo", product);
		}
	}

	private Integer mapPrice(Product product) {
		try {
			Price price = stripeClient.client().prices().retrieve(product.getDefaultPrice());

			return price.getUnitAmount().intValue();
		} catch (StripeException se) {
			throw new StripeProductValidationException("Unable to retrieve price", product);
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

	private Comparator<StripeMerchItem> merchItemNameComparator = new Comparator<StripeMerchItem>() {
		@Override
		public int compare(StripeMerchItem merchItem1, StripeMerchItem merchItem2) {
			return merchItem1.getName().compareTo(merchItem2.getName());
		}
	};

	private void validateProduct(Product product) {
		validateProductImages(product);
		validateProductMetadata(product);
	}

	private void validateProductImages(Product product) {
		if (product.getImages().isEmpty()) {
			throw new StripeProductValidationException("images are not set", product);
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
			throw new StripeProductValidationException(String.format("metadata '%s' is not set", key), product);
		}
	}

	private void validateProductMetadataBooleanValue(String key, Product product) {
		validateProductMetadataValue(key, product);

		if (
			!(product.getMetadata().get(key).trim().equals("true") || product.getMetadata().get(key).trim().equals("false"))
		) {
			throw new StripeProductValidationException(String.format("metadata '%s' is not a boolean", key), product);
		}
	}

	private void validateProductMetadataIntegerValue(String key, Product product) {
		validateProductMetadataValue(key, product);

		try {
			Integer.parseInt(product.getMetadata().get(key).trim());
		} catch (NumberFormatException e) {
			throw new StripeProductValidationException(String.format("metadata '%s' is not a number", key), product);
		}
	}
}
