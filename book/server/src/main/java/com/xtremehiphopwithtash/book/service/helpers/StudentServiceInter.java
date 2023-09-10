package com.xtremehiphopwithtash.book.service.helpers;

public interface StudentServiceInter<Entity, Input, ID> extends EntityServiceBaseInter<Entity, Input, ID> {
	Entity create(String studentID, Input input);
}
