package com.xtremehiphopwithtash.book.graphql.input;

import com.xtremehiphopwithtash.book.other.PaymentMethod;
import java.util.Optional;
import java.util.UUID;

public record BookingInput(
	Optional<String> notes,
	UUID sessionID,
	Integer bookingQuantity,
	Optional<Integer> equipmentQuantity,
	Optional<PaymentMethod> paymentMethod,
	Optional<String> couponCode
) {}
