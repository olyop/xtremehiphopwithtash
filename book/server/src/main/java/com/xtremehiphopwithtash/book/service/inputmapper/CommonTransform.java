package com.xtremehiphopwithtash.book.service.inputmapper;

import java.util.Optional;

final class CommonTransform {

	public static final String transformText(Optional<String> value) {
		if (value.isEmpty()) {
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
		if (name.isEmpty()) {
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
}