package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface GetSessionsInput {
	Instant getStartTime();
	Instant getEndTime();
	Optional<UUID> getCourseID();
}
