package com.xtremehiphopwithtash.book.service.inter;

public interface EntityServiceInter<Entity, Input, ID> extends EntityServiceBaseInter<Entity, Input, ID> {
	ID cancelByID(ID id);
}
