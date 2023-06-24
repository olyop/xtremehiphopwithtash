package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class ClassDescriptionQuery {

	public final String SELECT = "SELECT class_description FROM class_description;";

	public final String UPDATE = "UPDATE class_description SET class_description = :value;";
}
