package com.xtremehiphopwithtash.book.resolver.validator;

interface ValidatorCRUD<ID, Input> extends ValidatorRUD<ID, Input> {
	public void validateCreate(Input input);
}
