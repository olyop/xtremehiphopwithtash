package com.xtremehiphopwithtash.book.service.database.details;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class DetailsQuery {

	private final SQLUtil sqlUtil = new SQLUtil("details", SQLColumnNames.join(SQLColumnNames.DETAILS, "details"));

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String EXISTS_BY_FIRST_LAST_NAME = sqlUtil.read("exists-by-first-last-name");

	final String EXISTS_BY_FIRST_LAST_NICK_NAME = sqlUtil.read("exists-by-first-last-nick-name");

	final String SELECT_GENDERS = sqlUtil.read("select-genders");
}
