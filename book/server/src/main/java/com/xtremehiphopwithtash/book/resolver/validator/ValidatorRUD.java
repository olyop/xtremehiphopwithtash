package com.xtremehiphopwithtash.book.resolver.validator;

public interface ValidatorRUD<ID, Input> extends ValidatorRU<ID, Input> {
	public void validateDelete(ID id);
}
