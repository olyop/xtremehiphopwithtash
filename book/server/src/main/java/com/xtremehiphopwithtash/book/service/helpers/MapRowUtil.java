package com.xtremehiphopwithtash.book.service.helpers;

import com.xtremehiphopwithtash.book.other.LikertScale;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class MapRowUtil {

	public final UUID mapUUID(ResultSet rs, String columnName) throws SQLException {
		String value = rs.getString(columnName);

		if (value == null) {
			return null;
		}

		return UUID.fromString(value);
	}

	public URL mapURL(ResultSet rs, String columnName) throws SQLException {
		String value = rs.getString(columnName);

		if (value == null) {
			return null;
		}

		try {
			return URI.create(rs.getString(columnName)).toURL();
		} catch (MalformedURLException mue) {
			throw new SQLException(mue);
		}
	}

	public Instant mapInstant(ResultSet rs, String columnName) throws SQLException {
		int value = rs.getInt(columnName);

		if (value == 0) {
			return null;
		}

		return Instant.ofEpochSecond(value);
	}

	public LikertScale mapLikertScale(ResultSet rs, String columnName) throws SQLException {
		return new LikertScale(rs.getInt(columnName));
	}

	public Integer mapInteger(ResultSet rs, String columnName) throws SQLException {
		int value = rs.getInt(columnName);

		return value == 0 ? null : value;
	}

	public <T extends Enum<T>> T mapEnum(ResultSet rs, String columnName, Class<T> enumClass) throws SQLException {
		String value = rs.getString(columnName);

		if (value == null) {
			return null;
		} else {
			return Enum.valueOf(enumClass, value);
		}
	}
}
