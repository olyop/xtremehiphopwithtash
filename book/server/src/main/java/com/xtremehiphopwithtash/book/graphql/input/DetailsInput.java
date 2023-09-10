package com.xtremehiphopwithtash.book.graphql.input;

import java.util.Optional;

public record DetailsInput(
	String firstName,
	String lastName,
	Optional<String> nickName,
	Optional<String> gender,
	String mobilePhoneNumber,
	String emailAddress,
	Optional<String> instagramUsername
) {}
