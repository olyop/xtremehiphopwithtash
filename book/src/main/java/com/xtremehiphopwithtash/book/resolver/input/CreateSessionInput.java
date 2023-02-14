package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface CreateSessionInput {
	String getTitle();
	String getNotes();
	Instant getStartTime();
	Instant getEndTime();
	String getLocation();
	Float getPrice();
	UUID getCourseID();
	List<UUID> getInstructorIDs();
}
