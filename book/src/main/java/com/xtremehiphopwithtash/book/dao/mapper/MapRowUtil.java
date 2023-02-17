package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.other.LikertScale;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.time.Instant;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public final class MapRowUtil {

	public static UUID mapToUUID(String value) {
		return UUID.fromString(value);
	}

	public static URL mapToURL(String value) throws SQLException {
		try {
			URL url = new URL(value);
			return url;
		} catch (MalformedURLException mue) {
			throw new SQLException(mue);
		}
	}

	public static Instant mapToInstant(Integer value) {
		return Instant.ofEpochSecond(value);
	}

	public static LikertScale mapToLikertScale(Integer value) {
		return new LikertScale(value);
	}

	public static Short mapToPrice(Short value) {
		return value == 0 ? null : value;
	}
}
