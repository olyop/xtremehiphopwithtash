package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.ReferralCode;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class ReferralCodeRowMapper implements RowMapper<ReferralCode> {

	@Override
	@Nullable
	public ReferralCode mapRow(ResultSet rs, int rowNum) throws SQLException {
		ReferralCode referralCode = new ReferralCode();

		referralCode.setReferralCodeID(MapRowUtil.mapToUUID(rs.getString("referral_code_id")));

		referralCode.setCode(rs.getString("code"));
		referralCode.setUsedAt(MapRowUtil.mapToInstant(rs.getInt("used_at")));

		referralCode.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return referralCode;
	}
}
