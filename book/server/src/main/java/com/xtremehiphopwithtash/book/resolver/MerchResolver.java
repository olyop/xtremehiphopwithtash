package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.service.stripe.StripeMerchItem;
import com.xtremehiphopwithtash.book.service.stripe.StripeService;
import java.util.List;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MerchResolver {

	private final StripeService stripeService;

	public MerchResolver(StripeService stripeService) {
		this.stripeService = stripeService;
	}

	@QueryMapping
	public List<StripeMerchItem> getMerchItems() {
		return stripeService.merch().retrieveAll();
	}
}
