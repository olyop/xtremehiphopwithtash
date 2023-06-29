package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class SessionQuery {

	private final SQLUtil sqlUtil = new SQLUtil("session", SQLColumnNames.join(SQLColumnNames.BOOKING, "session"));

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	public final String CANCEL_BY_ID = sqlUtil.read("cancel-by-id");

	public final String SELECT_BY_COURSE_ID = sqlUtil.read("select-by-course-id");

	public final String SELECT_BY_INSTRUCTOR_ID = sqlUtil.read("select-by-instructor-id");

	public final String SELECT_BY_LOCATION_ID = sqlUtil.read("select-by-location-id");

	public final String SELECT_IN_TIME_PERIOD = sqlUtil.read("select-in-time-period");

	public final String SELECT_IN_TIME_PERIOD_NOT_CANCELLED = sqlUtil.read("select-in-time-period-not-cancelled");

	public final String SELECT_IN_TIME_PERIOD_EXCLUDE_SESSION = sqlUtil.read("select-in-time-period-exclude-session");

	public final String SELECT_IN_TIME_PERIOD_AND_COURSE_ID = sqlUtil.read("select-in-time-period-and-course-id");

	public final String SELECT_EQUIPMENT_LEFT_BY_SESSION_ID = sqlUtil.read("select-equipment-left-by-session-id");
}
