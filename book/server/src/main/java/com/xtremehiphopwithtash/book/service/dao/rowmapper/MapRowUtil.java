package com.xtremehiphopwithtash.book.service.dao.rowmapper;

import com.xtremehiphopwithtash.book.other.LikertScale;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.sql.SQLException;
import java.time.Instant;
import java.util.UUID;

public class MapRowUtil {

	public static final UUID mapUUID(String value) {
		if (value == null) {
			return null;
		} else {
			return UUID.fromString(value);
		}
	}

	public static final URL mapURL(String value) throws SQLException {
		try {
			URL url = URI.create(value).toURL();
			return url;
		} catch (MalformedURLException mue) {
			throw new SQLException(mue);
		}
	}

	public static final Instant mapInstant(Integer value) {
		if (value == 0) {
			return null;
		} else {
			return Instant.ofEpochSecond(value);
		}
	}

	public static final LikertScale mapLikertScale(Integer value) {
		return new LikertScale(value);
	}

	public static final Integer mapInteger(int value) {
		return value == 0 ? null : value;
	}

	public static final <T extends Enum<T>> T mapEnum(Class<T> enumClass, String value) {
		if (value == null) {
			return null;
		} else {
			return Enum.valueOf(enumClass, value);
		}
	}
}
