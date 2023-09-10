package com.xtremehiphopwithtash.book.service.helpers;

public interface EntityUpdateDAO<Model, ID> {
	Model updateByID(ID id, Model value);
}
