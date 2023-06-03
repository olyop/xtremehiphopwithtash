package com.xtremehiphopwithtash.book.service.dao.inter;

public interface EntityBaseDAO<Model, ID> extends BaseDAO<Model> {
	public Model selectByID(ID id);

	public boolean existsByID(ID id);
}
