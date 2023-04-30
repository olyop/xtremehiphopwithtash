package com.xtremehiphopwithtash.book.resolver.validator;

interface Validator<ID, Input> extends ValidatorBase<ID> {
	public void validateInput(Input input);

	public void validateCreate(Input input);

	public void validateUpdate(ID id, Input input);

	public void validateDelete(ID id);
}
