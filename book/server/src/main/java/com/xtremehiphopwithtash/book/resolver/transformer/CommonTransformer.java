package com.xtremehiphopwithtash.book.resolver.transformer;

import java.util.Optional;

public final class CommonTransformer {

	public static final Optional<String> transformName(Optional<String> name) {
		if (name.isEmpty()) {
			return Optional.empty();
		} else {
			return Optional.ofNullable(transformName(name.get()));
		}
	}

	public static final String transformName(String name) {
		if (name.isEmpty() || name.isBlank()) {
			return null;
		} else {
			return name.substring(0, 1).toUpperCase() + name.substring(1);
		}
	}
}
