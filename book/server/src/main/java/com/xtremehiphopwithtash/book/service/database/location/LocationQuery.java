package com.xtremehiphopwithtash.book.service.database.location;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
public final class LocationQuery {

	private final SQLUtil sqlUtil = new SQLUtil("location", SQLColumnNames.join(SQLColumnNames.LOCATION, "location"));

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String SELECT_BY_NAME = sqlUtil.read("select-by-name");

	final String SELECT_EXISTS_CHECK_FOR_DUPLICATE = sqlUtil.read("exists-check-for-duplicate");

	final String SELECT_BY_PLUS_CODE = sqlUtil.read("select-by-plus-code");
}
