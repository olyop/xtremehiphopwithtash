package com.xtremehiphopwithtash.book.service.dao.query;

import com.xtremehiphopwithtash.book.service.dao.util.SQLColumnNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class StudentQuery {

	private final String columnNames = SQLColumnNamesUtil.join(SQLColumnNamesUtil.STUDENT, "student");

	public final String SELECT = String.format(
		"""
			SELECT
				%s
			FROM
				student
			JOIN
				booking
					ON booking.student_id = student.student_id
			GROUP BY
				student.student_id
			ORDER BY
				count(booking.student_id) DESC;
		""",
		columnNames
	);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM student WHERE student_id = :studentID;",
		columnNames
	);

	public final String INSERT = String.format(
		"INSERT INTO student (student_id, details_id) VALUES (:studentID, :detailsID) RETURNING %s;",
		columnNames
	);

	public final String DELETE_BY_ID = "DELETE FROM student WHERE student_id = :studentID;";

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM student WHERE student_id = :studentID);";
}
