package com.xtremehiphopwithtash.book.graphql.input;

import java.time.Instant;

public record GetSessionsInput(Instant startTime, Instant endTime) {}
