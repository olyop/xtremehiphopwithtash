package com.xtremehiphopwithtash.book.service.integration.stripe;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.ChargeUpdateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentCreateParams.AutomaticPaymentMethods;
import com.stripe.param.PaymentIntentUpdateParams;
import com.xtremehiphopwithtash.book.graphql.input.BookingInput;
import com.xtremehiphopwithtash.book.other.CreatePaymentIntentResponse;
import com.xtremehiphopwithtash.book.other.ObjectMapperCustom;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripePaymentIntentModule {

	private final StripeClientCustom stripeClient;

	private final String currency;
	private final ObjectMapperCustom objectMapper;

	StripePaymentIntentModule(
		StripeClientCustom stripeClient,
		ObjectMapperCustom objectMapper,
		@Value("${stripe.currency}") String currency
	) {
		this.stripeClient = stripeClient;
		this.currency = currency;
		this.objectMapper = objectMapper;
	}

	public CreatePaymentIntentResponse create(
		BookingInput bookingInput,
		String studentID,
		String emailAddress,
		String stripeCustomerID,
		String bookingDescription,
		long amount
	) {
		validateCustomerExists(stripeCustomerID);

		try {
			Map<String, String> metadata = constructPaymentIntentMetadata(studentID, bookingInput);

			AutomaticPaymentMethods automaticPaymentMethods = AutomaticPaymentMethods.builder().setEnabled(true).build();

			PaymentIntentCreateParams params = PaymentIntentCreateParams
				.builder()
				.setCurrency(currency)
				.setAmount(amount)
				.setCustomer(stripeCustomerID)
				.setDescription(bookingDescription)
				.setAutomaticPaymentMethods(automaticPaymentMethods)
				.putAllMetadata(metadata)
				.build();

			PaymentIntent paymentIntent = stripeClient.client().paymentIntents().create(params);

			return new CreatePaymentIntentResponse(paymentIntent.getClientSecret());
		} catch (Exception e) {
			e.printStackTrace();
			throw new ResolverException("Unable to create payment intent");
		}
	}

	public URL retrieveChargeReceiptURL(String paymentIntentID) {
		try {
			PaymentIntent paymentIntent = stripeClient.client().paymentIntents().retrieve(paymentIntentID);

			Charge charge = stripeClient.client().charges().retrieve(paymentIntent.getLatestCharge());

			if (charge == null) {
				throw new ResolverException("Unable to retrieve charge");
			}

			return URI.create(charge.getReceiptUrl()).toURL();
		} catch (StripeException e) {
			e.printStackTrace();
			throw new ResolverException("Unable to retrieve charge");
		} catch (MalformedURLException mue) {
			throw new ResolverException("Unable to parse charge receipt URL");
		}
	}

	public void updateDescriptions(List<String> paymentIntentIDs, String description) {
		paymentIntentIDs.stream().parallel().forEach(updatePaymentIntentDescription(description));
	}

	private Consumer<String> updatePaymentIntentDescription(String description) {
		return paymentIntentID -> {
			try {
				PaymentIntent paymentIntent = stripeClient.client().paymentIntents().retrieve(paymentIntentID);

				PaymentIntentUpdateParams paymentIntentParams = PaymentIntentUpdateParams
					.builder()
					.setDescription(description)
					.build();

				Charge charge = stripeClient.client().charges().retrieve(paymentIntent.getLatestCharge());

				if (charge == null) {
					throw new ResolverException("Unable to retrieve charge");
				}

				ChargeUpdateParams chargeParams = ChargeUpdateParams.builder().setDescription(description).build();

				// Run both of these in parallel
				List
					.of(paymentIntentParams, chargeParams)
					.parallelStream()
					.forEach(params -> {
						try {
							if (params instanceof PaymentIntentUpdateParams) {
								stripeClient.client().paymentIntents().update(paymentIntentID, (PaymentIntentUpdateParams) params);
							} else {
								stripeClient.client().charges().update(charge.getId(), (ChargeUpdateParams) params);
							}
						} catch (StripeException se) {
							se.printStackTrace();
							throw new ResolverException("Unable to update invoice description");
						}
					});
			} catch (Exception e) {
				e.printStackTrace();
				throw new ResolverException("Unable to update invoice description");
			}
		};
	}

	private void validateCustomerExists(String stripeCustomerID) {
		try {
			stripeClient.client().customers().retrieve(stripeCustomerID);
		} catch (StripeException se) {
			se.printStackTrace();
			throw new ResolverException("Customer does not exist");
		}
	}

	private Map<String, String> constructPaymentIntentMetadata(String studentID, BookingInput bookingInput)
		throws JsonProcessingException {
		Map<String, String> metadata = new HashMap<>();

		metadata.put("studentID", studentID);
		metadata.put("bookingInput", objectMapper.instance().writeValueAsString(bookingInput));

		return metadata;
	}
}
