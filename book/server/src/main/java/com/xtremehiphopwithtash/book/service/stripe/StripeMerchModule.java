package com.xtremehiphopwithtash.book.service.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.StripeCollection;
import com.stripe.param.ProductListParams;
import com.xtremehiphopwithtash.book.model.MerchItem;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.net.URI;
import java.net.URISyntaxException;
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

	public List<MerchItem> retrieveAll() {
		try {
			StripeCollection<Product> productsCollection = stripeClient.client().products().list(productListParams);

			List<MerchItem> merchItems = productsCollection
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

	private Comparator<MerchItem> merchItemComparator = new Comparator<MerchItem>() {
		@Override
		public int compare(MerchItem merchItem1, MerchItem merchItem2) {
			return merchItem1.getName().compareTo(merchItem2.getName());
		}
	};

	private Predicate<Product> productsFilter = product -> {
		return product.getActive() && !product.getName().equals("Shipping") && !product.getName().equals("Hoodie");
	};

	private Function<Product, MerchItem> productToMerchItem = product -> {
		MerchItem merchItem = new MerchItem();

		merchItem.setMerchItemID(product.getId());
		merchItem.setName(product.getName());
		merchItem.setDescription(product.getDescription());
		merchItem.setPhoto(getProductImage(product));
		merchItem.setPrice(defaultPriceToAmount(product));
		merchItem.setStock(getStock(product));
		merchItem.setSizesAvailable(getSizesAvailable(product));

		return merchItem;
	};

	private URI getProductImage(Product product) {
		try {
			return new URI(product.getImages().get(0));
		} catch (URISyntaxException use) {
			throw new ResolverException("Unable to retrieve product image");
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
