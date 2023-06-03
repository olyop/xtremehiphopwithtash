package com.xtremehiphopwithtash.book.service.dao.query;

import com.xtremehiphopwithtash.book.service.dao.util.SQLColumnNamesUtil;
import org.springframework.stereotype.Component;

@Component
public final class LocationQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.LOCATION,
		"location"
	);

	public final String SELECT = String.format("SELECT %s FROM location;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM location WHERE location_id = :locationID;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO location
				(name, plus_code, address)
			VALUES
				(:name, :plusCode, :address)
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String UPDATE_BY_ID = String.format(
		"""
			UPDATE
				location
			SET
				name = :name,
				plus_code = :plusCode,
				address = :address
			WHERE
				location_id = :locationID
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM location WHERE location_id = :locationID);";

	public final String DELETE_BY_ID = "DELETE FROM location WHERE location_id = :locationID;";

	public final String EXISTS_CHECK_FOR_DUPLICATE =
		"SELECT EXISTS (SELECT 1 FROM location WHERE name = :name OR plus_code = :plusCode OR address = :address);";

	public final String SELECT_BY_NAME = String.format(
		"SELECT %s FROM location WHERE name = :name;",
		columnNames
	);

	public final String SELECT_BY_PLUS_CODE = String.format(
		"SELECT %s FROM location WHERE plus_code = :plusCode;",
		columnNames
	);
}
