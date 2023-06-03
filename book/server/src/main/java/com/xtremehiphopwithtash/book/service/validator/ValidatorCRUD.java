package com.xtremehiphopwithtash.book.service.validator;

interface ValidatorCRUD<ID, Input> extends ValidatorRUD<ID, Input> {
	public void validateCreate(Input input);
}
