package com.xtremehiphopwithtash.book.dao.inter;

public interface EntityDAO<Bean, ID> extends EntityBaseDAO<Bean, ID> {
	public Bean updateByID(ID id, Bean value);
}
