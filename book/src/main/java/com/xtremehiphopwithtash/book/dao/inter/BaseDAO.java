package com.xtremehiphopwithtash.book.dao.inter;

import java.util.List;

public abstract interface BaseDAO<Model> {
	public Model insert(Model value);

	public List<Model> select();
}
