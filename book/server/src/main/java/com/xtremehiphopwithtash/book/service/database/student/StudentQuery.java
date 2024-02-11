package com.xtremehiphopwithtash.book.service.database.student;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class StudentQuery {

	private final SQLUtil sqlUtil = new SQLUtil("student", SQLColumnNames.join(SQLColumnNames.STUDENT, "student"));

	final String SELECT = sqlUtil.read("select");

	final String SELECT_COUNT = sqlUtil.read("select-count");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String SELECT_HAS_VIEWED_INSTALL_POPUP = sqlUtil.read("select-has-viewed-install-pop-up");

	public String UPDATE_HAS_VIEWED_INSTALL_POPUP = sqlUtil.read("update-has-viewed-install-pop-up");
}
