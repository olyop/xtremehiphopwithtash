package com.xtremehiphopwithtash.book.resolver.validator;

public interface Validator<ID, Input> extends ValidatorBase<ID> {
	public void validateInput(Input input);
}
