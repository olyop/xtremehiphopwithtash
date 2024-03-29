package com.xtremehiphopwithtash.book.service.database.booking;

import com.xtremehiphopwithtash.book.other.PaymentMethod;
import com.xtremehiphopwithtash.book.service.helpers.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityUpdateDAO;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BookingDAO implements EntityBaseDAO<Booking, UUID>, EntityUpdateDAO<Booking, UUID>, EntityDeleteDAO<UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final BookingQuery query;
	private final BookingRowMapper rowMapper;

	public BookingDAO(NamedParameterJdbcTemplate jdbcTemplate, BookingQuery query, BookingRowMapper rowMapper) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Booking selectByID(UUID bookingID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("bookingID", bookingID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	@Override
	public void deleteByID(UUID bookingID) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean existsByID(UUID bookingID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("bookingID", bookingID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Booking insert(Booking value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = mapBookingSqlParameterSource(value);

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public Booking insertWithBookingID(Booking value) {
		String sql = query.INSERT_WITH_BOOKING_ID;

		MapSqlParameterSource paramSource = mapBookingSqlParameterSource(value);
		paramSource.addValue("bookingID", value.getBookingID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	private MapSqlParameterSource mapBookingSqlParameterSource(Booking value) {
		MapSqlParameterSource paramSource = new MapSqlParameterSource();

		paramSource.addValue("sessionID", value.getSessionID());
		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("studentID", value.getStudentID());
		paramSource.addValue("bookingQuantity", value.getBookingQuantity());
		paramSource.addValue("equipmentQuantity", value.getEquipmentQuantity());
		paramSource.addValue("paymentMethod", value.getPaymentMethod() == null ? null : value.getPaymentMethod().name());
		paramSource.addValue("paymentIntentID", value.getPaymentIntentID());
		paramSource.addValue("cost", value.getCost());

		return paramSource;
	}

	@Override
	public List<Booking> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public Booking updateByID(UUID bookingID, Booking value) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("bookingID", bookingID);
		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("bookingQuantity", value.getBookingQuantity());
		paramSource.addValue("equipmentQuantity", value.getEquipmentQuantity());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public void cancelByID(UUID bookingID) {
		String sql = query.CANCEL_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("bookingID", bookingID);

		jdbcTemplate.update(sql, paramSource);
	}

	public List<Booking> selectBySessionID(UUID sessionID) {
		String sql = query.SELECT_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Booking> selectBySessionIDNotCancelled(UUID sessionID) {
		String sql = query.SELECT_BY_SESSION_ID_AND_NOT_CANCELLED;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Booking> selectByStudentID(String studentID) {
		String sql = query.SELECT_BY_STUDENT_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public int selectSum() {
		String sql = query.SELECT_SUM;

		return jdbcTemplate.getJdbcTemplate().queryForObject(sql, Integer.class);
	}

	public int selectSumByStudentID(String studentID) {
		String sql = query.SELECT_SUM_BY_STUDENT_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public int selectSumByStudentIDAndFree(String studentID) {
		String sql = query.SELECT_SUM_BY_STUDENT_ID_AND_FREE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public int selectSumByStudentIDAndPaymentMethod(String studentID, PaymentMethod paymentMethod) {
		String sql = query.SELECT_SUM_BY_STUDENT_ID_AND_PAYMENT_METHOD;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("studentID", studentID);
		paramSource.addValue("paymentMethod", paymentMethod.name());

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public int selectCapacityBooked(UUID sessionID) {
		String sql = query.SELECT_CAPACITY_BOOKED_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public int selectCapacityRemaining(UUID sessionID) {
		String sql = query.SELECT_CAPACITY_REMAINING_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public boolean selectIsCapacityRemaining(UUID sessionID, int bookingQuantity) {
		String sql = query.SELECT_IS_CAPACITY_REMAINING_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("bookingQuantity", bookingQuantity);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public int selectEquipmentHired(UUID sessionID) {
		String sql = query.SELECT_EQUIPMENT_HIRED_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public int selectEquipmentRemaining(UUID sessionID) {
		String sql = query.SELECT_EQUIPMENT_REMAINING_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public boolean selectIsEquipmentRemaining(UUID sessionID, int equipmentQuantity) {
		String sql = query.SELECT_IS_EQUIPMENT_REMAINING_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("equipmentQuantity", equipmentQuantity);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public boolean existsByCashFreeAndStudentIDAndSessionID(String studentID, UUID sessionID) {
		String sql = query.EXISTS_BY_CASH_AND_FREE_AND_STUDENT_ID_AND_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("studentID", studentID);
		paramSource.addValue("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public void updateHasCheckedIn(UUID bookingID, boolean hasCheckedIn) {
		String sql = query.UPDATE_HAS_CHECKED_IN_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("bookingID", bookingID);
		paramSource.addValue("hasCheckedIn", hasCheckedIn);

		jdbcTemplate.update(sql, paramSource);
	}

	public boolean existsBySessionAndStudent(UUID sessionID, String studentID) {
		String sql = query.EXISTS_BY_SESSION_ID_AND_STUDENT_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public int selectGrossSum() {
		String sql = query.SELECT_GROSS_SUM;

		return jdbcTemplate.getJdbcTemplate().queryForObject(sql, Integer.class);
	}

	public int selectGrossBySessionID(UUID sessionID) {
		String sql = query.SELECT_GROSS_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public boolean existsBySessionAndStudentAndCancelled(UUID sessionID, String studentID) {
		String sql = query.EXISTS_BY_SESSION_ID_AND_STUDENT_ID_AND_CANCELLED;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public void updateHasConfirmed(UUID bookingID, boolean hasConfirmed) {
		String sql = query.UPDATE_HAS_CONFIRMED_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("bookingID", bookingID);
		paramSource.addValue("hasConfirmed", hasConfirmed);

		jdbcTemplate.update(sql, paramSource);
	}

	public Instant selectLastBookingDateByStudentID(String studentID) {
		String sql = query.SELECT_LAST_BOOKING_DATE_BY_STUDENT_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return Instant.ofEpochSecond(jdbcTemplate.queryForObject(sql, paramSource, Integer.class));
	}
}
