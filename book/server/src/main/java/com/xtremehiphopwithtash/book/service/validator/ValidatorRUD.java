package com.xtremehiphopwithtash.book.service.validator;

interface ValidatorRUD<ID, Input> extends ValidatorRU<ID, Input> {
	public void validateCancel(ID id);
}
