package com.xtremehiphopwithtash.book.service.helpers;

import java.util.List;

public abstract interface BaseDAO<Model> {
	Model insert(Model value);

	List<Model> select();
}
