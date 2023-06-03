package com.xtremehiphopwithtash.book.controller.body;

import java.util.Optional;

public record DetailsBody(
	String firstName,
	String lastName,
	Optional<String> nickName,
	Optional<String> gender,
	String mobilePhoneNumber,
	Optional<String> emailAddress,
	Optional<String> instagramUsername
) {}
