package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.service.integration.stripe.StripeMerchItem;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeService;
import java.util.List;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MerchResolver {

	private final StripeService stripeService;

	public MerchResolver(StripeService stripeService) {
		this.stripeService = stripeService;
	}

	@SchemaMapping(typeName = "MerchItem", field = "isInStock")
	public boolean isInStock(StripeMerchItem merchItem) {
		return merchItem.isInStock();
	}

	@QueryMapping
	public List<StripeMerchItem> getMerchItems() {
		return stripeService.merch().retrieveAll();
	}
}
