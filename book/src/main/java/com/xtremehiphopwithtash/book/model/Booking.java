package com.xtremehiphopwithtash.book.model;

import java.util.UUID;

public class Booking extends BaseModel {

	private UUID bookingID;
	private String notes;
	private Boolean isBringingOwnEquipment;
	private UUID sessionID;
	private String studentID;

	public Booking() {}

	public UUID getBookingID() {
		return bookingID;
	}

	public void setBookingID(UUID bookingID) {
		this.bookingID = bookingID;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Boolean getIsBringingOwnEquipment() {
		return isBringingOwnEquipment;
	}

	public void setIsBringingOwnEquipment(Boolean isBringingOwnEquipment) {
		this.isBringingOwnEquipment = isBringingOwnEquipment;
	}

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
