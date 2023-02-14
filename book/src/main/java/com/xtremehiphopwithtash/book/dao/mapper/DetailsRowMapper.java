package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.Details;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class DetailsRowMapper implements RowMapper<Details> {

	@Override
	@Nullable
	public Details mapRow(ResultSet rs, int rowNum) throws SQLException {
		Details details = new Details();

		details.setDetailsID(MapRowUtil.mapToUUID(rs.getString("details_id")));
		details.setFirstName(rs.getString("first_name"));
		details.setLastName(rs.getString("last_name"));
		details.setNickName(rs.getString("nick_name"));
		details.setGender(rs.getString("gender"));
		details.setMobilePhoneNumber(rs.getString("mobile_phone_number"));
		details.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return details;
	}
}
