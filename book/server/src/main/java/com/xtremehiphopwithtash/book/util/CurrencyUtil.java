package com.xtremehiphopwithtash.book.util;

import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class CurrencyUtil {

	public Short dollarsToCents(Optional<Short> amount) {
		if (amount.isPresent()) {
			return dollarsToCents(amount.get());
		} else {
			return null;
		}
	}

	public short dollarsToCents(double amount) {
		return (short) (amount * 100);
	}

	public Short centsToDollars(Optional<Short> amount) {
		if (amount.isPresent()) {
			return centsToDollars(amount.get());
		} else {
			return null;
		}
	}

	public short centsToDollars(double amount) {
		return (short) Math.floor(amount / 100);
	}
}
