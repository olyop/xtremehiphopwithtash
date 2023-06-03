package com.xtremehiphopwithtash.book.service.dao.inter;

public interface EntityRelationshipDAO<Model, ID, Index> extends BaseDAO<Model> {
	public Model selectByID(ID id, Index index);

	public void deleteByID(ID id, Index index);
}
