package com.xtremehiphopwithtash.book.service.validator;

interface Validator<ID, Input> extends ValidatorBase<ID> {
	public void validateInput(Input input);
}
