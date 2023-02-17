package com.xtremehiphopwithtash.book.resolver.input;

import java.util.Optional;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface DetailsInput {
	String getFirstName();
	String getLastName();
	Optional<String> getNickName();
	String getMobilePhoneNumber();
	String getGender();
}
