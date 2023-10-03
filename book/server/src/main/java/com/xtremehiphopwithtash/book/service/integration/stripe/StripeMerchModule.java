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
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeMerchModule {

	private int cacheDuration;

	private final StripeClientCustom stripeClient;

	private Instant expiresAt;
	private List<StripeMerchItem> merchItemsCache;

	StripeMerchModule(@Value("${stripe.merch.cache.timeout.min}") int cacheTimeoutMin, StripeClientCustom stripeClient) {
		this.cacheDuration = cacheTimeoutMin * 60;

		this.stripeClient = stripeClient;

		this.expiresAt = Instant.now();
	}

	private final ProductListParams productListParams = ProductListParams.builder().setActive(true).build();

	public List<StripeMerchItem> retrieveAll() {
		Instant now = Instant.now();

		if (merchItemsCache == null || now.isAfter(expiresAt)) {
			synchronized (this) {
				if (merchItemsCache == null || now.isAfter(expiresAt)) {
					merchItemsCache = getMerchItems();
					expiresAt = now.plusSeconds(cacheDuration);
				}
			}
		}

		return merchItemsCache;
	}

	private List<StripeMerchItem> getMerchItems() {
		try {
			StripeCollection<Product> productsCollection = stripeClient.client().products().list(productListParams);

			List<StripeMerchItem> merchItems = productsCollection
				.getData()
				.stream()
				.filter(productsFilter)
				.map(productToMerchItem)
				.sorted(merchItemComparator)
				.toList();

			return merchItems;
		} catch (StripeException se) {
			se.printStackTrace();
			throw new ResolverException("Unable to retrieve products");
		}
	}

	private Comparator<StripeMerchItem> merchItemComparator = new Comparator<StripeMerchItem>() {
		@Override
		public int compare(StripeMerchItem merchItem1, StripeMerchItem merchItem2) {
			return merchItem1.getName().compareTo(merchItem2.getName());
		}
	};

	private Predicate<Product> productsFilter = product -> {
		return product.getActive() && !product.getName().equals("Shipping") && !product.getName().equals("Hoodie");
	};

	private Function<Product, StripeMerchItem> productToMerchItem = product -> {
		StripeMerchItem merchItem = new StripeMerchItem();

		merchItem.setMerchItemID(product.getId());
		merchItem.setName(product.getName());
		merchItem.setDescription(product.getDescription());
		merchItem.setPhoto(getProductImage(product));
		merchItem.setPrice(defaultPriceToAmount(product));
		merchItem.setStock(getStock(product));
		merchItem.setSizesAvailable(getSizesAvailable(product));

		return merchItem;
	};

	private URL getProductImage(Product product) {
		try {
			return URI.create(product.getImages().get(0)).toURL();
		} catch (MalformedURLException mue) {
			throw new ResolverException("Unable to parse product image URL");
		}
	}

	private Integer defaultPriceToAmount(Product product) {
		try {
			Price price = stripeClient.client().prices().retrieve(product.getDefaultPrice());
			return price.getUnitAmount().intValue();
		} catch (StripeException se) {
			se.printStackTrace();
			throw new ResolverException("Unable to retrieve price");
		}
	}

	private int getStock(Product product) {
		String stock = product.getMetadata().get("stock");
		return stock == null ? 0 : Integer.valueOf(stock);
	}

	private String[] getSizesAvailable(Product product) {
		String sizesAvailable = product.getMetadata().get("sizesAvailable");
		return sizesAvailable == null ? null : sizesAvailable.split(",");
	}
}
