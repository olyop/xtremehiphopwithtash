package com.xtremehiphopwithtash.book.resolver.validator;

public interface Validator<ID, Input> {
	public void validateID(ID id);

	public void validateInput(Input input);
}
