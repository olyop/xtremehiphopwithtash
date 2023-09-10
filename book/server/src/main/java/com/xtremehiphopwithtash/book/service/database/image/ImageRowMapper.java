package com.xtremehiphopwithtash.book.service.database.image;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class ImageRowMapper implements RowMapper<ImageItem> {

	private final MapRowUtil mapRowUtil;

	public ImageRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public ImageItem mapRow(ResultSet rs, int rowNum) throws SQLException {
		ImageItem ici = new ImageItem();

		ici.setImageID(mapRowUtil.mapUUID(rs, "image_id"));
		ici.setData(rs.getBytes("data"));

		ici.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return ici;
	}
}
