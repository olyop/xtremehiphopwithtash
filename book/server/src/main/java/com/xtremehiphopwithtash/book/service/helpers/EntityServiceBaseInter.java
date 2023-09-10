package com.xtremehiphopwithtash.book.service.helpers;

import java.util.List;

public interface EntityServiceBaseInter<Entity, Input, ID> {
	List<Entity> retreiveAll();
	Entity retreiveByID(ID id);
	Entity create(Input input);
	Entity updateByID(ID id, Input input);
	boolean existsByID(ID id);
}
