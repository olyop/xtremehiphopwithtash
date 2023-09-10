package com.xtremehiphopwithtash.book.service.database.session.instructor;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.util.UUID;

public class SessionInstructor extends BaseModel {

	private UUID sessionID;
	private Short index;
	private UUID instructorID;

	public SessionInstructor() {}

	public UUID getSessionID() {
		return sessionID;
	}

	public void setSessionID(UUID sessionID) {
		this.sessionID = sessionID;
	}

	public UUID getInstructorID() {
		return instructorID;
	}

	public void setInstructorID(UUID instructorID) {
		this.instructorID = instructorID;
	}

	public Short getIndex() {
		return index;
	}

	public void setIndex(Short index) {
		this.index = index;
	}
}
