package com.xtremehiphopwithtash.book.service.database.classdescription;

import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class ClassDescriptionQuery {

	private final SQLUtil sqlUtil = new SQLUtil("classdescription");

	final String SELECT = sqlUtil.read("select");
	final String UPDATE = sqlUtil.read("update");
}
