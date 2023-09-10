package com.xtremehiphopwithtash.book.service.helpers;

import java.util.Optional;

public final class CommonTransform {

	public static final String transformText(Optional<String> value) {
		if (value.isEmpty() || value.get().isEmpty() || value.get().isBlank()) {
			return null;
		}

		return transformText(value.get());
	}

	public static final String transformText(String value) {
		if (value == null) {
			return null;
		}

		return value.trim().replaceAll(" +", " ");
	}

	public static final String transformName(Optional<String> name) {
		if (name.isEmpty() || name.get().isEmpty() || name.get().isBlank()) {
			return null;
		}

		return transformName(name.get());
	}

	public static final String transformName(String name) {
		if (name.isEmpty() || name.isBlank()) {
			return null;
		}

		String trimmedName = transformText(name);

		return trimmedName.substring(0, 1).toUpperCase() + trimmedName.substring(1);
	}

	public static final String transformMobilePhoneNumber(String value) {
		return transformText(value).replace(" ", "");
	}

	public static final String transformToLower(Optional<String> value) {
		if (value.isEmpty() || value.get().isEmpty() || value.get().isBlank()) {
			return null;
		}

		return transformToLower(value.get());
	}

	public static final String transformToLower(String value) {
		return transformText(value).toLowerCase();
	}
}
