package com.xtremehiphopwithtash.book.resolver.input;

import java.util.Optional;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface DetailsInput {
	String getFirstName();
	String getLastName();
	Optional<String> getNickName();
	Optional<String> getGender();
	String getMobilePhoneNumber();
	Optional<String> getInstagramUsername();
}
