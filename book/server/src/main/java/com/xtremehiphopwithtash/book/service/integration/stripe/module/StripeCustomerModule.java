package com.xtremehiphopwithtash.book.service.integration.stripe.module;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerUpdateParams;
import com.xtremehiphopwithtash.book.service.database.details.Details;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeClient;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class StripeCustomerModule {

	private final StripeClient stripeClient;

	StripeCustomerModule(StripeClient stripeClient) {
		this.stripeClient = stripeClient;
	}

	public String createCustomer(String studentID, Details details) {
		try {
			Map<String, String> metadata = new HashMap<>();
			metadata.put("studentID", studentID);

			CustomerCreateParams params = CustomerCreateParams
				.builder()
				.setName(formatCustomerName(details))
				.setEmail(details.getEmailAddress())
				.setPhone(details.getMobilePhoneNumber())
				.setMetadata(metadata)
				.build();

			Customer customer = stripeClient.customers().create(params);

			return customer.getId();
		} catch (StripeException se) {
			throw new ResolverException("Unable to create Stripe customer", se);
		}
	}

	public void updateCustomer(String stripeCustomerID, Details details) {
		try {
			Customer customer = stripeClient.customers().retrieve(stripeCustomerID);

			CustomerUpdateParams params = CustomerUpdateParams
				.builder()
				.setName(formatCustomerName(details))
				.setEmail(details.getEmailAddress())
				.setPhone(details.getMobilePhoneNumber())
				.build();

			customer.update(params);
		} catch (StripeException se) {
			throw new ResolverException("Unable to update Stripe customer", se);
		}
	}

	private String formatCustomerName(Details details) {
		return String.format("%s %s", details.getFirstName(), details.getLastName());
	}
}
