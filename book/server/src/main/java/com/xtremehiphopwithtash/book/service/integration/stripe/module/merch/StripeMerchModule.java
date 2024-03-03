package com.xtremehiphopwithtash.book.service.integration.stripe.module.merch;

import com.stripe.exception.StripeException;
import com.stripe.model.Product;
import com.stripe.model.StripeCollection;
import com.stripe.param.ProductListParams;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeClient;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StripeMerchModule {

	private final StripeClient stripeClient;
	private final StripeMerchValidator stripeMerchValidator;
	private final StripeMerchMapper stripeMerchMapper;

	StripeMerchModule(StripeClient stripeClient) {
		this.stripeClient = stripeClient;
		this.stripeMerchValidator = new StripeMerchValidator();
		this.stripeMerchMapper = new StripeMerchMapper(stripeClient);
	}

	private final ProductListParams productListParams = ProductListParams.builder().setActive(true).build();

	public List<StripeMerchItem> retrieveAll() {
		try {
			StripeCollection<Product> productsCollection = stripeClient.products().list(productListParams);

			List<Product> products = productsCollection.getData();

			List<StripeMerchItem> merchItems = products
				.stream()
				.filter(this::shouldFilter)
				.map(this::productToMerchItem)
				.sorted(merchItemNameComparator)
				.toList();

			return merchItems;
		} catch (StripeException se) {
			throw new ResolverException(se);
		}
	}

	public StripeMerchItem retrieveByID(String merchItemID) {
		try {
			Product product = stripeClient.products().retrieve(merchItemID);

			if (!shouldFilter(product)) {
				throw new ResolverException("Product not found");
			}

			return stripeMerchMapper.productToMerchItem(product);
		} catch (StripeException se) {
			throw new ResolverException(se);
		}
	}

	private StripeMerchItem productToMerchItem(Product product) {
		stripeMerchValidator.validateProduct(product);

		return stripeMerchMapper.productToMerchItem(product);
	}

	private boolean shouldFilter(Product product) {
		boolean active = product.getActive();

		boolean show = product.getMetadata().get("show") == null
			? false
			: Boolean.parseBoolean(product.getMetadata().get("show").trim());

		return active && show;
	}

	private Comparator<StripeMerchItem> merchItemNameComparator = new Comparator<StripeMerchItem>() {
		@Override
		public int compare(StripeMerchItem merchItem1, StripeMerchItem merchItem2) {
			return merchItem1.getName().compareTo(merchItem2.getName());
		}
	};
}
