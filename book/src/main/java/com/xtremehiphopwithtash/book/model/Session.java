package com.xtremehiphopwithtash.book.model;

import java.time.Instant;
import java.util.UUID;

public class Session extends Base {

	private UUID sessionID;
	private String title;
	private String notes;
	private UUID locationID;
	private Short price;
	private Short capacity;
	private Instant startTime;
	private Instant endTime;
	private UUID courseID;
	private Short equipmentAvailable;

	public Session() {}

	public UUID getSessionID() {
		return sessionID;
	}

	public void setSessionID(UUID sessionID) {
		this.sessionID = sessionID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public UUID getLocationID() {
		return locationID;
	}

	public void setLocationID(UUID locationID) {
		this.locationID = locationID;
	}

	public Short getPrice() {
		return price;
	}

	public void setPrice(Short price) {
		this.price = price;
	}

	public Short getCapacity() {
		return capacity;
	}

	public void setCapacity(Short capacity) {
		this.capacity = capacity;
	}

	public Instant getStartTime() {
		return startTime;
	}

	public void setStartTime(Instant startTime) {
		this.startTime = startTime;
	}

	public Instant getEndTime() {
		return endTime;
	}

	public void setEndTime(Instant endTime) {
		this.endTime = endTime;
	}

	public UUID getCourseID() {
		return courseID;
	}

	public void setCourseID(UUID courseID) {
		this.courseID = courseID;
	}

	public Short getEquipmentAvailable() {
		return equipmentAvailable;
	}

	public void setEquipmentAvailable(Short equipmentAvailable) {
		this.equipmentAvailable = equipmentAvailable;
	}
}
