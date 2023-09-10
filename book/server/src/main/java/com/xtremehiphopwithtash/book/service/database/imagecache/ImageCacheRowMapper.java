package com.xtremehiphopwithtash.book.service.database.imagecache;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class ImageCacheRowMapper implements RowMapper<ImageCacheItem> {

	private final MapRowUtil mapRowUtil;

	public ImageCacheRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public ImageCacheItem mapRow(ResultSet rs, int rowNum) throws SQLException {
		ImageCacheItem ici = new ImageCacheItem();

		ici.setImageCacheID(mapRowUtil.mapUUID(rs, "image_cache_id"));
		ici.setData(rs.getBytes("data"));
		ici.setExpiresAt(mapRowUtil.mapInstant(rs, "expires_at"));

		ici.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return ici;
	}
}
