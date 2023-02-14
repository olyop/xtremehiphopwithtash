package com.xtremehiphopwithtash.book.dao.inter;

import java.util.Optional;

public interface EntityBaseDAO<Bean, ID> extends BaseDAO<Bean> {
	public Optional<Bean> selectByID(ID id);

	public boolean deleteByID(ID id);

	public boolean existsByID(ID id);
}
