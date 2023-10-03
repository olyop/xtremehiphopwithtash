package com.xtremehiphopwithtash.book.other;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import org.springframework.stereotype.Service;

@Service
public class ObjectMapperCustom {

	private final ObjectMapper objectMapper;

	public ObjectMapperCustom() {
		this.objectMapper = new ObjectMapper();
		this.objectMapper.registerModule(new Jdk8Module());
		this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}

	public ObjectMapper instance() {
		return objectMapper;
	}
}
