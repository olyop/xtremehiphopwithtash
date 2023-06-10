package com.xtremehiphopwithtash.book.util;

import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class CurrencyUtil {

	public Integer dollarsToCents(Optional<Integer> amount) {
		if (amount.isPresent()) {
			return dollarsToCents(amount.get());
		} else {
			return null;
		}
	}

	public Integer dollarsToCents(Integer amount) {
		if (amount == null) {
			return null;
		}

		return amount * 100;
	}

	public Integer centsToDollars(Optional<Integer> amount) {
		if (amount.isPresent()) {
			return centsToDollars(amount.get());
		} else {
			return null;
		}
	}

	public Integer centsToDollars(Integer amount) {
		if (amount == null) {
			return null;
		}

		return (int) amount / 100;
	}
}
