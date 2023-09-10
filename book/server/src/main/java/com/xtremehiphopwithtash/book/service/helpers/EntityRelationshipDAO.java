package com.xtremehiphopwithtash.book.service.helpers;

public interface EntityRelationshipDAO<Model, ID, Index> extends BaseDAO<Model> {
	Model selectByID(ID id, Index index);

	void deleteByID(ID id, Index index);
}
