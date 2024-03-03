package com.xtremehiphopwithtash.book.service.integration.stripe.module;

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
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeClient;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Consumer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripePaymentIntentModule {

	private final StripeClient stripeClient;
	private final ObjectMapperCustom objectMapper;

	private final String currency;

	private final AutomaticPaymentMethods automaticPaymentMethods;

	StripePaymentIntentModule(
		@Value("${stripe.currency}") String currency,
		StripeClient stripeClient,
		ObjectMapperCustom objectMapper
	) {
		this.stripeClient = stripeClient;
		this.objectMapper = objectMapper;

		this.currency = currency;

		this.automaticPaymentMethods = AutomaticPaymentMethods.builder().setEnabled(true).build();
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

		UUID bookingID = UUID.randomUUID();

		try {
			Map<String, String> metadata = constructPaymentIntentMetadata(studentID, bookingInput, bookingID);

			PaymentIntentCreateParams params = PaymentIntentCreateParams
				.builder()
				.setCurrency(currency)
				.setAmount(amount)
				.setCustomer(stripeCustomerID)
				.setDescription(bookingDescription)
				.setAutomaticPaymentMethods(automaticPaymentMethods)
				.putAllMetadata(metadata)
				.build();

			PaymentIntent paymentIntent = stripeClient.paymentIntents().create(params);

			CreatePaymentIntentResponse response = new CreatePaymentIntentResponse();
			response.setClientSecret(paymentIntent.getClientSecret());
			response.setBookingID(bookingID);
			response.setLiveMode(paymentIntent.getLivemode());

			return response;
		} catch (Exception e) {
			throw new ResolverException("Unable to create payment intent", e);
		}
	}

	public URL retrieveChargeReceiptURL(String paymentIntentID) {
		try {
			PaymentIntent paymentIntent = stripeClient.paymentIntents().retrieve(paymentIntentID);

			Charge charge = stripeClient.charges().retrieve(paymentIntent.getLatestCharge());

			if (charge == null) {
				throw new ResolverException("Unable to retrieve charge");
			}

			return URI.create(charge.getReceiptUrl()).toURL();
		} catch (StripeException se) {
			throw new ResolverException("Unable to retrieve charge", se);
		} catch (MalformedURLException mue) {
			throw new ResolverException("Unable to parse charge receipt URL", mue);
		}
	}

	public void updateDescriptions(List<String> paymentIntentIDs, String description) {
		paymentIntentIDs.stream().parallel().forEach(updatePaymentIntentDescription(description));
	}

	private Consumer<String> updatePaymentIntentDescription(String description) {
		return paymentIntentID -> {
			try {
				PaymentIntent paymentIntent = stripeClient.paymentIntents().retrieve(paymentIntentID);

				PaymentIntentUpdateParams paymentIntentParams = PaymentIntentUpdateParams
					.builder()
					.setDescription(description)
					.build();

				Charge charge = stripeClient.charges().retrieve(paymentIntent.getLatestCharge());

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
								stripeClient.paymentIntents().update(paymentIntentID, (PaymentIntentUpdateParams) params);
							} else {
								stripeClient.charges().update(charge.getId(), (ChargeUpdateParams) params);
							}
						} catch (StripeException se) {
							throw new ResolverException("Unable to update invoice description", se);
						}
					});
			} catch (Exception e) {
				throw new ResolverException("Unable to update invoice description", e);
			}
		};
	}

	private void validateCustomerExists(String stripeCustomerID) {
		try {
			stripeClient.customers().retrieve(stripeCustomerID);
		} catch (StripeException se) {
			throw new ResolverException("Customer does not exist", se);
		}
	}

	private Map<String, String> constructPaymentIntentMetadata(
		String studentID,
		BookingInput bookingInput,
		UUID bookingID
	) throws JsonProcessingException {
		Map<String, String> metadata = new HashMap<>();

		metadata.put("studentID", studentID);
		metadata.put("bookingInput", objectMapper.instance().writeValueAsString(bookingInput));
		metadata.put("bookingID", bookingID.toString());

		return metadata;
	}
}
