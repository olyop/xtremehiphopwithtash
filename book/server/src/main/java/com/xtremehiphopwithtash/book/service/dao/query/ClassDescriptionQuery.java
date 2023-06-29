package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class ClassDescriptionQuery {

	private final SQLUtil sqlUtil = new SQLUtil("class-description");

	public final String SELECT = sqlUtil.read("select");
	public final String UPDATE = sqlUtil.read("update");
}
