package com.xtremehiphopwithtash.book.resolver.validator;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.URL;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
class CommonValidator {

	public void validateURL(URL url) {
		if (!url.getProtocol().equalsIgnoreCase("https")) {
			throw new ResolverException("Invalid URL - protocol must be HTTPS");
		}

		try (Socket socket = new Socket()) {
			socket.connect(new InetSocketAddress(url.getHost(), 443), 500);
		} catch (IOException e) {
			throw new ResolverException(String.format("Invalid URL - %s", e.getMessage()));
		}
	}

	public void validatePrice(Optional<Short> price) {
		if (price.isPresent() && price.get() > 100) {
			throw new ResolverException("Price cannot be greater than $100");
		}
	}
}
