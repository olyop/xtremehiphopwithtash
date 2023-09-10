package com.xtremehiphopwithtash.book.service.helpers;

public interface InputMapper<Input, Entity> {
	Entity map(Input input);
}
