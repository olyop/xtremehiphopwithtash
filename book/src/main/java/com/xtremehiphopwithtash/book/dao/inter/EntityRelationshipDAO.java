package com.xtremehiphopwithtash.book.dao.inter;

import java.util.Optional;

public interface EntityRelationshipDAO<Bean, ID, Index> extends BaseDAO<Bean> {
	public Optional<Bean> selectByID(ID id, Index index);

	public boolean deleteByID(ID id, Index index);

	public boolean existsByID(ID id, Index index);
}
