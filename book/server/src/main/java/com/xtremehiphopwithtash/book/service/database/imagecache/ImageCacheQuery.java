package com.xtremehiphopwithtash.book.service.database.imagecache;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class ImageCacheQuery {

	private final SQLUtil sqlUtil = new SQLUtil("image-cache", SQLColumnNames.join(SQLColumnNames.COUPON, "image_cache"));

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");
}
