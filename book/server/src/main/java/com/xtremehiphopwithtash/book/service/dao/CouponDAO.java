package com.xtremehiphopwithtash.book.service.dao;

import com.xtremehiphopwithtash.book.model.Coupon;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityUpdateDAO;
import com.xtremehiphopwithtash.book.service.dao.query.CouponQuery;
import com.xtremehiphopwithtash.book.service.dao.rowmapper.CouponRowMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CouponDAO implements EntityBaseDAO<Coupon, String>, EntityUpdateDAO<Coupon, String> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final CouponQuery query;
	private final CouponRowMapper rowMapper;

	public CouponDAO(NamedParameterJdbcTemplate jdbcTemplate, CouponQuery query, CouponRowMapper rowMapper) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Coupon insert(Coupon value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("code", value.getCode());
		paramSource.addValue("discount", value.getDiscount());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public List<Coupon> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public Coupon selectByID(String code) {
		String sql = query.SELECT_BY_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("code", code);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	@Override
	public boolean existsByID(String code) {
		String sql = query.EXISTS_BY_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("code", code);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Coupon updateByID(String code, Coupon value) {
		String sql = query.UPDATE_BY_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("code", code);
		paramSource.addValue("usedAt", value.getUsedAt().getEpochSecond());
		paramSource.addValue("usedByStudentID", value.getUsedByStudentID());
		paramSource.addValue("usedOnBookingID", value.getUsedOnBookingID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public void deleteByStudentAndBooking(String studentID, UUID bookingID) {
		String sql = query.DELETE_BY_STUDENT_AND_BOOKING;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("studentID", studentID);
		paramSource.addValue("bookingID", bookingID);

		jdbcTemplate.update(sql, paramSource);
	}
}
