package com.xtremehiphopwithtash.book.resolver.input;

import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface CreateDetailsInput {
	String getFirstName();
	String getLastName();
	String getNickName();
	String getMobilePhoneNumber();
	String getGender();
}
