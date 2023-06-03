package com.xtremehiphopwithtash.book.service.inputmapper;

interface InputMapper<Input, Entity> {
	public Entity map(Input input);
}
