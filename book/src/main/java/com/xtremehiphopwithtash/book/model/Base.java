package com.xtremehiphopwithtash.book.model;

import java.io.Serializable;
import java.time.Instant;

abstract class Base implements Serializable {

	private Instant createdAt;

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
}
