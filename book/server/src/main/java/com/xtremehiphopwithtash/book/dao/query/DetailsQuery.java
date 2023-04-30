package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class DetailsQuery {

	private final String columnNames = SQLColumnNamesUtil.join(SQLColumnNamesUtil.DETAILS, "details");

	public final String SELECT = String.format("SELECT %s FROM details;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM details WHERE details_id = :detailsID;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO details
				(first_name, last_name, nick_name, gender, mobile_phone_number, instagram_username)
			VALUES
				(:firstName, :lastName, :nickName, :gender::details_gender, :mobilePhoneNumber, :instagramUsername)
			RETURNING
				%s;
			""",
		columnNames
	);

	public final String UPDATE_BY_ID = String.format(
		"""
			UPDATE
				details
			SET
				first_name = :firstName,
				last_name = :lastName,
				nick_name = :nickName,
				gender = :gender::details_gender,
				mobile_phone_number = :mobilePhoneNumber,
				instagram_username = :instagramUsername
			WHERE
				details_id = :detailsID
			RETURNING
				%s;
			""",
		columnNames
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS(SELECT 1 FROM details WHERE details_id = :detailsID);";

	public final String DELETE_BY_ID = "DELETE FROM details WHERE details_id = :detailsID;";

	public final String EXISTS_BY_FIRST_LAST_NAME =
		"""
			SELECT EXISTS (
				SELECT
					1
				FROM
					details
				WHERE
					first_name = :firstName AND
					last_name = :lastName
			);
		""";

	public final String EXISTS_BY_FIRST_LAST_NICK_NAME =
		"""
			SELECT EXISTS (
				SELECT
					1
				FROM
					details
				WHERE
					first_name = :firstName AND
					last_name = :lastName AND
					nick_name = :nickName
			);
		""";

	public final String SELECT_GENDERS = "SELECT UNNEST(ENUM_RANGE(NULL::details_gender)) AS GENDER;";
}
