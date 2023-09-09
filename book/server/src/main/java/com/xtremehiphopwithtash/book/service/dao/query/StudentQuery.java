package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class StudentQuery {

	private final SQLUtil sqlUtil = new SQLUtil("student", SQLColumnNames.join(SQLColumnNames.STUDENT, "student"));

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_COUNT = sqlUtil.read("select-count");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");
}
