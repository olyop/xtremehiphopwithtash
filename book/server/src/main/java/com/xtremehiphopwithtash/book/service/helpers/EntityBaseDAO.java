package com.xtremehiphopwithtash.book.service.helpers;

public interface EntityBaseDAO<Model, ID> extends BaseDAO<Model> {
	Model selectByID(ID id);

	boolean existsByID(ID id);
}
