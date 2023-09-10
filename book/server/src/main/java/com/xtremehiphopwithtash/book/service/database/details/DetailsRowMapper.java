package com.xtremehiphopwithtash.book.service.database.details;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class DetailsRowMapper implements RowMapper<Details> {

	private final MapRowUtil mapRowUtil;

	public DetailsRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Details mapRow(ResultSet rs, int rowNum) throws SQLException {
		Details d = new Details();

		d.setDetailsID(mapRowUtil.mapUUID(rs, "details_id"));

		d.setFirstName(rs.getString("first_name"));
		d.setLastName(rs.getString("last_name"));
		d.setNickName(rs.getString("nick_name"));
		d.setGender(rs.getString("gender"));
		d.setMobilePhoneNumber(rs.getString("mobile_phone_number"));
		d.setEmailAddress(rs.getString("email_address"));
		d.setInstagramUsername(rs.getString("instagram_username"));

		d.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return d;
	}
}
