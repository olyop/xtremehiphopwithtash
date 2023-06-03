package com.xtremehiphopwithtash.book.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import java.lang.module.ResolutionException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

	public StripeService(@Value("${stripe.live.key}") String secretKey) {
		Stripe.apiKey = secretKey;
	}

	public String createPaymentIntent(long price) {
		try {
			SessionCreateParams params = SessionCreateParams
				.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.addLineItem(
					SessionCreateParams.LineItem
						.builder()
						.setPriceData(
							PriceData
								.builder()
								.setCurrency("aud")
								.setUnitAmount(1000L)
								.setProductData(
									PriceData.ProductData.builder().setName("Xtreme Hip Hop with Tash").build()
								)
								.build()
						)
						.setQuantity(1L)
						.build()
				)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("http://localhost:3000/success")
				.setCancelUrl("http://localhost:3000/cancel")
				.build();
			Session session = Session.create(params);
			return session.getId();
		} catch (StripeException e) {
			throw new ResolutionException(e.getMessage());
		}
	}
}
