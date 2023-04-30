package com.xtremehiphopwithtash.book.resolver.input;

import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public record CourseInput(
	String name,
	String description,
	URL photo,
	Optional<Short> defaultPrice,
	Optional<Short> defaultEquipmentFee,
	Short defaultDuration,
	Short defaultCapacity,
	Optional<Short> defaultEquipmentAvailable,
	UUID defaultLocationID,
	List<UUID> defaultInstructorIDs
) {}
