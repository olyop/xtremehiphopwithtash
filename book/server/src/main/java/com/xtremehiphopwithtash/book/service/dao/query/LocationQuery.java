package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public final class LocationQuery {

	private final SQLUtil sqlUtil = new SQLUtil("location", SQLColumnNames.join(SQLColumnNames.LOCATION, "location"));

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	public final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	public final String SELECT_BY_NAME = sqlUtil.read("select-by-name");

	public final String SELECT_EXISTS_CHECK_FOR_DUPLICATE = sqlUtil.read("exists-check-for-duplicate");

	public final String SELECT_BY_PLUS_CODE = sqlUtil.read("select-by-plus-code");
}
