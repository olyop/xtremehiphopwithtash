package com.xtremehiphopwithtash.book.service.database.session;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.time.Instant;
import java.util.UUID;

public class Session extends BaseModel {

	private UUID sessionID;
	private String title;
	private String notes;
	private UUID locationID;
	private Integer price;
	private Integer equipmentFee;
	private Instant startTime;
	private Instant endTime;
	private UUID courseID;
	private Integer capacityAvailable;
	private Integer equipmentAvailable;
	private boolean isCancelled;

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

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Integer getEquipmentFee() {
		return equipmentFee;
	}

	public void setEquipmentFee(Integer equipmentFee) {
		this.equipmentFee = equipmentFee;
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

	public Integer getCapacityAvailable() {
		return capacityAvailable;
	}

	public void setCapacityAvailable(Integer capacityAvailable) {
		this.capacityAvailable = capacityAvailable;
	}

	public Integer getEquipmentAvailable() {
		return equipmentAvailable;
	}

	public void setEquipmentAvailable(Integer equipmentAvailable) {
		this.equipmentAvailable = equipmentAvailable;
	}

	public boolean isCancelled() {
		return isCancelled;
	}

	public void setCancelled(boolean isCancelled) {
		this.isCancelled = isCancelled;
	}
}
