package com.xtremehiphopwithtash.book.dao.inter;

public interface EntityDAO<Model, ID> extends EntityBaseDAO<Model, ID> {
	public Model updateByID(ID id, Model value);
}
