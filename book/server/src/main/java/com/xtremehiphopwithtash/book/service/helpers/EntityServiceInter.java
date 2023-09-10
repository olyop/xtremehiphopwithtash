package com.xtremehiphopwithtash.book.service.helpers;

public interface EntityServiceInter<Entity, Input, ID> extends EntityServiceBaseInter<Entity, Input, ID> {
	ID deleteByID(ID id);
}
