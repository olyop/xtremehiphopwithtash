package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface SessionInput {
	String getTitle();
	String getNotes();
	UUID getLocationID();
	Optional<Short> getPrice();
	Short getCapacity();
	Instant getStartTime();
	Instant getEndTime();
	UUID getCourseID();
	Short getEquipmentAvailable();
	List<UUID> getInstructorIDs();
}
