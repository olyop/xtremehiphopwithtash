package com.xtremehiphopwithtash.book.service.validator;

interface ValidatorRU<ID, Input> extends Validator<ID, Input> {
	public void validateUpdate(ID id, Input input);
}
