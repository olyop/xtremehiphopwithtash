package com.xtremehiphopwithtash.book.resolver.input;

import java.util.Optional;
import java.util.UUID;

public record BookingInput(
	Optional<String> notes,
	boolean isBringingOwnEquipment,
	UUID sessionID
) {}
