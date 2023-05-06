package com.xtremehiphopwithtash.book.resolver.validator;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.URL;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
class CommonValidator {

	public void validateText(Optional<String> text, String label, int maxLength) {
		if (text.isPresent()) {
			validateText(text.get(), label, maxLength);
		}
	}

	public void validateText(String text, String label, int maxLength) {
		validateTextIsNotEmpty(text, label);
		validateTextLength(text, label, maxLength);
	}

	private void validateTextIsNotEmpty(String text, String label) {
		if (text.isEmpty()) {
			throw new ResolverException(String.format("%s cannot be empty", label));
		}
		if (text.isBlank()) {
			throw new ResolverException(String.format("%s cannot be blank", label));
		}
	}

	private void validateTextLength(String string, String label, int maxLength) {
		if (string.length() > maxLength) {
			throw new ResolverException(
				String.format("%s length cannot be greater than %d", label, maxLength)
			);
		}
	}

	public void validateURL(URL url, String label) {
		if (!url.getProtocol().equalsIgnoreCase("https")) {
			throw new ResolverException(String.format("%s must use https", label));
		}

		try (Socket socket = new Socket()) {
			socket.connect(new InetSocketAddress(url.getHost(), 443), 500);
		} catch (IOException e) {
			throw new ResolverException(String.format("%s is not reachable", label));
		}
	}

	public void validatePrice(Optional<Short> price, String label) {
		if (price.isPresent() && price.get() <= 0 && price.get() <= 50) {
			throw new ResolverException(String.format("%s cannot be greater than A$50", label));
		}
	}

	public void validateNonZeroInteger(Optional<Short> integer, String label) {
		if (integer.isPresent()) {
			validateNonZeroInteger(integer.get(), label);
		}
	}

	public void validateNonZeroInteger(Short integer, String label) {
		if (integer <= 0) {
			throw new ResolverException(String.format("%s cannot be less than or equal to 0", label));
		}
	}
}
