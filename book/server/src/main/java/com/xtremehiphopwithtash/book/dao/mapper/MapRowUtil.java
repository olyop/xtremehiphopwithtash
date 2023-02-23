package com.xtremehiphopwithtash.book.dao.mapper;

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
		return UUID.fromString(value);
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
		return Instant.ofEpochSecond(value);
	}

	public static final LikertScale mapToLikertScale(Integer value) {
		return new LikertScale(value);
	}

	public static final Short mapToPrice(Short value) {
		return value == 0 ? null : value;
	}
}
