package com.xtremehiphopwithtash.book.resolver.input;

import java.net.URL;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface CreateInstructorInput {
	URL getPhoto();
	CreateDetailsInput getDetails();
}
