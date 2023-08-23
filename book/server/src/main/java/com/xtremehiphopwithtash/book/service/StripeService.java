package com.xtremehiphopwithtash.book.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.ProductCollection;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import com.stripe.param.ChargeUpdateParams;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.CustomerUpdateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentCreateParams.AutomaticPaymentMethods;
import com.stripe.param.PaymentIntentUpdateParams;
import com.stripe.param.ProductListParams;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.MerchItem;
import com.xtremehiphopwithtash.book.other.CreatePaymentIntentResponse;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.lang.module.ResolutionException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.function.Predicate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

	private final String currency;

	private final String webhookSecret;
	private final ObjectMapper objectMapper;

	public StripeService(
		@Value("${stripe.currency}") String currency,
		@Value("${stripe.live.key}") String secretKey,
		@Value("${stripe.webhook.secret}") String webhookSecret
	) {
		Stripe.apiKey = secretKey;

		this.currency = currency;
		this.webhookSecret = webhookSecret;

		this.objectMapper = new ObjectMapper();
		this.objectMapper.registerModule(new Jdk8Module());
	}

	private final CustomerListParams healthCheckParams = CustomerListParams.builder().setLimit(1L).build();
	private final ProductListParams productListParams = ProductListParams.builder().setActive(true).build();

	private Comparator<MerchItem> merchItemComparator = new Comparator<MerchItem>() {
		@Override
		public int compare(MerchItem merchItem1, MerchItem merchItem2) {
			return merchItem1.getName().compareTo(merchItem2.getName());
		}
	};

	public void healthCheck() {
		try {
			Customer.list(healthCheckParams);
		} catch (StripeException se) {
			throw new ResolverException("Unable to connect to Stripe");
		}
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

			Customer customer = Customer.create(params);

			return customer.getId();
		} catch (StripeException se) {
			throw new ResolverException("Unable to create Stripe customer");
		}
	}

	public void updateCustomer(String stripeCustomerID, Details details) {
		try {
			Customer customer = Customer.retrieve(stripeCustomerID);

			CustomerUpdateParams params = CustomerUpdateParams
				.builder()
				.setName(formatCustomerName(details))
				.setEmail(details.getEmailAddress())
				.setPhone(details.getMobilePhoneNumber())
				.build();

			customer.update(params);
		} catch (StripeException se) {
			se.printStackTrace();
			throw new ResolverException("Unable to update Stripe customer");
		}
	}

	public CreatePaymentIntentResponse createPaymentIntent(
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

			PaymentIntent paymentIntent = PaymentIntent.create(params);

			return new CreatePaymentIntentResponse(paymentIntent.getClientSecret());
		} catch (Exception e) {
			e.printStackTrace();
			throw new ResolverException("Unable to create payment intent");
		}
	}

	public Event constructPaymentEvent(String payload, String signature) {
		try {
			return Webhook.constructEvent(payload, signature, webhookSecret);
		} catch (Exception e) {
			throw new ResolutionException("Unable to parse webhook payload");
		}
	}

	public StripeObject constructObject(Event event) {
		StripeObject stripeObject = null;

		EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

		if (dataObjectDeserializer.getObject().isPresent()) {
			stripeObject = dataObjectDeserializer.getObject().get();
		} else {
			throw new IllegalArgumentException("Invalid object");
		}

		return stripeObject;
	}

	public URL retrieveChargeReceiptURL(String paymentIntentID) {
		try {
			PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentID);

			Charge charge = Charge.retrieve(paymentIntent.getLatestCharge());

			if (charge == null) {
				throw new ResolverException("Unable to retrieve charge");
			}

			return new URL(charge.getReceiptUrl());
		} catch (StripeException e) {
			e.printStackTrace();
			throw new ResolverException("Unable to retrieve charge");
		} catch (MalformedURLException e) {
			throw new ResolverException("Unable to parse charge receipt URL");
		}
	}

	public List<MerchItem> retrieveMerchItems() {
		try {
			ProductCollection productsCollection = Product.list(productListParams);

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

	public void updatePaymentIntentDescriptions(List<String> paymentIntentIDs, String description) {
		paymentIntentIDs.forEach(paymentIntentID -> updatePaymentIntentDescription(paymentIntentID, description));
	}

	private void updatePaymentIntentDescription(String paymentIntentID, String description) {
		try {
			PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentID);

			PaymentIntentUpdateParams paymentIntentParams = PaymentIntentUpdateParams
				.builder()
				.setDescription(description)
				.build();

			Charge charge = Charge.retrieve(paymentIntent.getLatestCharge());

			if (charge == null) {
				throw new ResolverException("Unable to retrieve charge");
			}

			ChargeUpdateParams chargeParams = ChargeUpdateParams.builder().setDescription(description).build();

			paymentIntent.update(paymentIntentParams);
			charge.update(chargeParams);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ResolverException("Unable to update invoice description");
		}
	}

	private void validateCustomerExists(String stripeCustomerID) {
		try {
			Customer.retrieve(stripeCustomerID);
		} catch (StripeException se) {
			throw new ResolverException("Customer does not exist");
		}
	}

	private Map<String, String> constructPaymentIntentMetadata(String studentID, BookingInput bookingInput)
		throws JsonProcessingException {
		Map<String, String> metadata = new HashMap<>();

		metadata.put("studentID", studentID);
		metadata.put("bookingInput", objectMapper.writeValueAsString(bookingInput));

		return metadata;
	}

	private String formatCustomerName(Details details) {
		return String.format("%s %s", details.getFirstName(), details.getLastName());
	}

	private Predicate<Product> productsFilter = product -> {
		return product.getActive() && !product.getName().equals("Shipping") && !product.getName().equals("Hoodie");
	};

	private Function<Product, MerchItem> productToMerchItem = product -> {
		try {
			MerchItem merchItem = new MerchItem();

			merchItem.setMerchItemID(product.getId());
			merchItem.setName(product.getName());
			merchItem.setDescription(product.getDescription());
			merchItem.setPhoto(new URL(product.getImages().get(0)));

			Price price = Price.retrieve(product.getDefaultPrice());
			merchItem.setPrice(price.getUnitAmount().intValue());

			int stock = product.getMetadata().get("stock") == null ? 0 : Integer.valueOf(product.getMetadata().get("stock"));
			merchItem.setStock(stock);

			String sizesAvailable = product.getMetadata().get("sizesAvailable");
			merchItem.setSizesAvailable(sizesAvailable == null ? null : sizesAvailable.split(","));

			return merchItem;
		} catch (StripeException se) {
			se.printStackTrace();
			throw new ResolverException("Unable to retrieve products");
		} catch (MalformedURLException e) {
			e.printStackTrace();
			throw new ResolverException("Unable to parse product image URL");
		}
	};
}
