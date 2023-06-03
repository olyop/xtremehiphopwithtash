package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.other.LikertScale;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.time.Instant;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
class MapRowUtil {

	public static final UUID mapToUUID(String value) {
		if (value == null) {
			return null;
		} else {
			return UUID.fromString(value);
		}
	}

	public static final URL mapToURL(String value) throws SQLException {
		try {
			URL url = new URL(value);
			return url;
		} catch (MalformedURLException mue) {
			throw new SQLException(mue);
		}
	}

	public static final Instant mapToInstant(Integer value) {
		if (value == 0) {
			return null;
		} else {
			return Instant.ofEpochSecond(value);
		}
	}

	public static final LikertScale mapToLikertScale(Integer value) {
		return new LikertScale(value);
	}

	public static final Short mapToShort(Short value) {
		return value == 0 ? null : value;
	}

	public static final Double mapToDouble(Double value) {
		return value == 0 ? null : value;
	}

	public static final <T extends Enum<T>> T mapToEnum(Class<T> enumClass, String value) {
		if (value == null) {
			return null;
		} else {
			return Enum.valueOf(enumClass, value);
		}
	}
}
