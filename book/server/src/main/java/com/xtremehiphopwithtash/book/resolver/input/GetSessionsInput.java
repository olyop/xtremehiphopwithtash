package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public record GetSessionsInput(Optional<UUID> courseID, Instant startTime, Instant endTime) {}
