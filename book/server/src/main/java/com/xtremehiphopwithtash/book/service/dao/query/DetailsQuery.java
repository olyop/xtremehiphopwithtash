package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class DetailsQuery {

	private final SQLUtil sqlUtil = new SQLUtil("details", SQLColumnNames.join(SQLColumnNames.DETAILS, "details"));

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	public final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	public final String EXISTS_BY_FIRST_LAST_NAME = sqlUtil.read("exists-by-first-last-name");

	public final String EXISTS_BY_FIRST_LAST_NICK_NAME = sqlUtil.read("exists-by-first-last-nick-name");

	public final String SELECT_GENDERS = sqlUtil.read("select-genders");
}
