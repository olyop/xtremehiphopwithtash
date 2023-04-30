package com.xtremehiphopwithtash.book.dao.inter;

public interface EntityUpdateDAO<Model, ID> {
	public Model updateByID(ID id, Model value);
}
