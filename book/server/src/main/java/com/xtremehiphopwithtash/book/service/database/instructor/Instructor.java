package com.xtremehiphopwithtash.book.service.database.instructor;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.net.URL;
import java.util.UUID;

public class Instructor extends BaseModel {

	private UUID instructorID;
	private URL photo;
	private UUID detailsID;

	public Instructor() {}

	public UUID getInstructorID() {
		return instructorID;
	}

	public void setInstructorID(UUID instructorID) {
		this.instructorID = instructorID;
	}

	public URL getPhoto() {
		return photo;
	}

	public void setPhoto(URL photo) {
		this.photo = photo;
	}

	public UUID getDetailsID() {
		return detailsID;
	}

	public void setDetailsID(UUID detailsID) {
		this.detailsID = detailsID;
	}

	@Override
	public String toString() {
		return ("Instructor [instructorID=" + instructorID + ", photo=" + photo + ", detailsID=" + detailsID + "]");
	}
}
