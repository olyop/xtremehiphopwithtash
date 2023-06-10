package com.xtremehiphopwithtash.book.resolver.input;

import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public record CourseInput(
	String name,
	String description,
	URL photo,
	Optional<Integer> defaultPrice,
	Optional<Integer> defaultEquipmentFee,
	Integer defaultDuration,
	Integer defaultCapacityAvailable,
	Optional<Integer> defaultEquipmentAvailable,
	UUID defaultLocationID,
	List<UUID> defaultInstructorIDs
) {}
