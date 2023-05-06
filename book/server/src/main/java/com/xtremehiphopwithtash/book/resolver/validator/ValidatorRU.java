package com.xtremehiphopwithtash.book.resolver.validator;

public interface ValidatorRU<ID, Input> extends Validator<ID, Input> {
	public void validateUpdate(ID id, Input input);
}
