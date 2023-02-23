package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import com.xtremehiphopwithtash.book.dao.util.SQLTableNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class CourseQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.COURSE,
		SQLTableNamesUtil.COURSE
	);

	public final String SELECT = String.format("SELECT %s FROM course;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM course WHERE course_id = :courseID;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO course
				(name, description, photo, default_price, default_duration, default_capacity, default_equipment_available, default_location_id)
			VALUES
				(:name, :description, :photo, :defaultPrice, :defaultDuration, :defaultCapacity, :defaultEquipmentAvailable, :defaultLocationID)
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String UPDATE_BY_ID = String.format(
		"""
			UPDATE
				course
			SET
				name = :name,
				description = :description,
				photo = :photo,
				default_price = :defaultPrice,
				default_duration = :defaultDuration,
				default_capacity = :defaultCapacity,
				default_equipment_available = :defaultEquipmentAvailable,
				default_location_id = :defaultLocationID
			WHERE
				course_id = :courseID
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM course WHERE course_id = :courseID);";

	public final String EXISTS_BY_NAME = "SELECT EXISTS (SELECT 1 FROM course WHERE name = :name);";

	public final String DELETE_BY_ID = "DELETE FROM course WHERE course_id = :courseID;";

	public final String SELECT_BY_INSTRUCTOR_ID = String.format(
		"""
			SELECT
				%s
			FROM
				course
			JOIN
				course_default_instructor
					ON course.course_id = course_default_instructor.course_id
			WHERE
				course_default_instructor.instructor_id = :instructorID;
		""",
		columnNames
	);

	public final String SELECT_BY_LOCATION_ID = String.format(
		"""
			SELECT
				%s
			FROM
				course
			WHERE
				default_location_id = :locationID;
		""",
		columnNames
	);
}
