package com.xtremehiphopwithtash.book.service.database.trends;

import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class TrendsQuery {

	private final SQLUtil sqlUtil = new SQLUtil("trends");

	final String SELECT_BOOKING_TRENDS = sqlUtil.read("select-booking-trends");
}
