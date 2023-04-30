package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public record SessionInput(
	String title,
	Optional<String> notes,
	UUID locationID,
	Optional<Short> price,
	Optional<Short> equipmentFee,
	Short capacity,
	Instant startTime,
	Instant endTime,
	UUID courseID,
	Optional<Short> equipmentAvailable,
	List<UUID> instructorIDs
) {}
