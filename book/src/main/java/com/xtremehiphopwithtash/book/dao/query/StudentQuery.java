package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import com.xtremehiphopwithtash.book.dao.util.SQLTableNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class StudentQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.STUDENT,
		SQLTableNamesUtil.STUDENT
	);

	public final String SELECT = String.format("SELECT %s FROM student;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM student WHERE student_id = :studentID;",
		columnNames
	);

	public final String INSERT = String.format(
		"INSERT INTO student (details_id) VALUES (:detailsID) RETURNING %s;",
		columnNames
	);

	public final String DELETE_BY_ID = "DELETE FROM student WHERE student_id = :studentID;";

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM student WHERE student_id = :studentID);";
}
