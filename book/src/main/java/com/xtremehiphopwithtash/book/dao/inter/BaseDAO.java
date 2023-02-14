package com.xtremehiphopwithtash.book.dao.inter;

import java.util.List;

public abstract interface BaseDAO<Bean> {
	public Bean insert(Bean value);

	public List<Bean> select();
}
