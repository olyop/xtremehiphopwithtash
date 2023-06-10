package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public record SessionInput(
	String title,
	Optional<String> notes,
	UUID locationID,
	Optional<Integer> price,
	Optional<Integer> equipmentFee,
	Instant startTime,
	Instant endTime,
	Integer capacityAvailable,
	Optional<Integer> equipmentAvailable,
	UUID courseID,
	List<UUID> instructorIDs
) {}
