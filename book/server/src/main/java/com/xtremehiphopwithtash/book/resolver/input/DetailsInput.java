package com.xtremehiphopwithtash.book.resolver.input;

import java.util.Optional;

public record DetailsInput(
	String firstName,
	String lastName,
	Optional<String> nickName,
	Optional<String> gender,
	String mobilePhoneNumber,
	Optional<String> instagramUsername
) {}
