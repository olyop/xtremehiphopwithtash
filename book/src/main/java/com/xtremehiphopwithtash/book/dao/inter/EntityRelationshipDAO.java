package com.xtremehiphopwithtash.book.dao.inter;

import java.util.Optional;

public interface EntityRelationshipDAO<Model, ID, Index> extends BaseDAO<Model> {
	public Optional<Model> selectByID(ID id, Index index);

	public void deleteByID(ID id, Index index);

	public boolean existsByID(ID id, Index index);
}
