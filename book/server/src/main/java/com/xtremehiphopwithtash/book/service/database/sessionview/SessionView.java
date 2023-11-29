package com.xtremehiphopwithtash.book.service.database.sessionview;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.util.UUID;

public class SessionView extends BaseModel {

	private UUID sessionID;
	private String studentID;

	public UUID getSessionID() {
		return sessionID;
	}

	public void setSessionID(UUID sessionID) {
		this.sessionID = sessionID;
	}

	public String getStudentID() {
		return studentID;
	}

	public void setStudentID(String studentID) {
		this.studentID = studentID;
	}
}
