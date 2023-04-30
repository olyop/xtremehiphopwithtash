package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import org.springframework.stereotype.Component;

@Component
public final class ReferralCodeQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.REFERRAL_CODE,
		"referral_code"
	);

	public final String SELECT = String.format("SELECT %s FROM referral_code;", columnNames);

	public final String SELECT_BY_CODE = String.format(
		"SELECT %s FROM referral_code WHERE code = :code;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO referral_code
				(code)
			VALUES
				(:code)
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String UPDATE_BY_CODE = String.format(
		"""
			UPDATE
				referral_code
			SET
				used_at = :usedAt
			WHERE
				code = :code
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String EXISTS_BY_CODE =
		"SELECT EXISTS (SELECT 1 FROM referral_code WHERE code = :code);";
}
