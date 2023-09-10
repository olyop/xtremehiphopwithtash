package com.xtremehiphopwithtash.book.service.database.image;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class ImageQuery {

	private final SQLUtil sqlUtil = new SQLUtil("image", SQLColumnNames.join(SQLColumnNames.IMAGE, "image"));

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");
}
