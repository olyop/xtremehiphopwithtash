package com.xtremehiphopwithtash.book.service.database.session;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class SessionQuery {

	private final SQLUtil sqlUtil = new SQLUtil("session", SQLColumnNames.join(SQLColumnNames.SESSION, "session"));

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String CANCEL_BY_ID = sqlUtil.read("cancel-by-id");

	final String SELECT_BY_COURSE_ID = sqlUtil.read("select-by-course-id");

	final String SELECT_BY_INSTRUCTOR_ID = sqlUtil.read("select-by-instructor-id");

	final String SELECT_BY_LOCATION_ID = sqlUtil.read("select-by-location-id");

	final String SELECT_IN_TIME_PERIOD = sqlUtil.read("select-in-time-period");

	final String SELECT_IN_TIME_PERIOD_EXCLUDE_SESSION = sqlUtil.read("select-in-time-period-exclude-session");

	final String SELECT_IN_TIME_PERIOD_AND_COURSE_ID = sqlUtil.read("select-in-time-period-and-course-id");

	final String SELECT_EQUIPMENT_LEFT_BY_SESSION_ID = sqlUtil.read("select-equipment-left-by-session-id");
}
