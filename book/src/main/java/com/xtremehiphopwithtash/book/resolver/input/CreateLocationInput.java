package com.xtremehiphopwithtash.book.resolver.input;

import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface CreateLocationInput {
	String getName();
	String getPlusCode();
}
