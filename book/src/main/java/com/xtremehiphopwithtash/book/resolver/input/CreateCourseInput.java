package com.xtremehiphopwithtash.book.resolver.input;

import java.net.URL;
import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface CreateCourseInput {
	String getName();
	URL getPhoto();
	String getDescription();
	Float getDefaultPrice();
	String getDefaultLocation();
	UUID getDefaultInstructorID();
}
