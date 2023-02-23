package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface GetSessionsInput {
	Optional<UUID> getCourseID();
	Instant getStartTime();
	Instant getEndTime();
}
