package com.xtremehiphopwithtash.book.resolver.mapper;

public interface InputMapper<Input, Entity> {
	public Entity map(Input input);
}
