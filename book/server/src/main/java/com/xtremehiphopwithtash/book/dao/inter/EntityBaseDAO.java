package com.xtremehiphopwithtash.book.dao.inter;

import java.util.Optional;

public interface EntityBaseDAO<Model, ID> extends BaseDAO<Model> {
	public Optional<Model> selectByID(ID id);

	public boolean existsByID(ID id);
}
