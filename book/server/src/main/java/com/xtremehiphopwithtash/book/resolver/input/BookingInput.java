package com.xtremehiphopwithtash.book.resolver.input;

import com.xtremehiphopwithtash.book.other.PaymentMethod;
import java.util.Optional;
import java.util.UUID;

public record BookingInput(
	Optional<String> notes,
	UUID sessionID,
	Short bookingQuantity,
	Optional<Short> equipmentQuantity,
	Optional<PaymentMethod> paymentMethod,
	Optional<String> couponCode
) {}
