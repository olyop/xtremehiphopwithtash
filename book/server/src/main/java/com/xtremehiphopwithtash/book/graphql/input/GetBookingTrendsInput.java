package com.xtremehiphopwithtash.book.graphql.input;

import java.time.Instant;

public record GetBookingTrendsInput(Instant startTime, Instant endTime) {}
