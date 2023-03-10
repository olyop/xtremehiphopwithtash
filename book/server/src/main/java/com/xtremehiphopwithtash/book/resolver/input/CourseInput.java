package com.xtremehiphopwithtash.book.resolver.input;

import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface CourseInput {
	String getName();
	String getDescription();
	URL getPhoto();
	Optional<Short> getDefaultPrice();
	Short getDefaultDuration();
	Short getDefaultCapacity();
	Short getDefaultEquipmentAvailable();
	UUID getDefaultLocationID();
	List<UUID> getDefaultInstructorIDs();
}
