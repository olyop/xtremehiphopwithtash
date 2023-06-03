package com.xtremehiphopwithtash.book.service.inter;

public interface StudentServiceInter<Entity, Input, ID>
	extends EntityServiceBaseInter<Entity, Input, ID> {
	Entity create(String studentID, Input input);
}
