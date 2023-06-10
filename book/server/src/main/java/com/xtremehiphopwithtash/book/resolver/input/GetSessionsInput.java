package com.xtremehiphopwithtash.book.resolver.input;

import java.time.Instant;

public record GetSessionsInput(Instant startTime, Instant endTime) {}
