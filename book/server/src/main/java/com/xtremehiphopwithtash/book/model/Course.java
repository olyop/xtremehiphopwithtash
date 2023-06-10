package com.xtremehiphopwithtash.book.model;

import java.net.URL;
import java.util.UUID;

public class Course extends Base {

	private UUID courseID;
	private String name;
	private String description;
	private URL photo;
	private Integer defaultPrice;
	private Integer defaultEquipmentFee;
	private Integer defaultDuration;
	private UUID defaultLocationID;
	private Integer defaultCapacityAvailable;
	private Integer defaultEquipmentAvailable;

	public UUID getCourseID() {
		return courseID;
	}

	public void setCourseID(UUID courseID) {
		this.courseID = courseID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public URL getPhoto() {
		return photo;
	}

	public void setPhoto(URL photo) {
		this.photo = photo;
	}

	public Integer getDefaultPrice() {
		return defaultPrice;
	}

	public void setDefaultPrice(Integer defaultPrice) {
		this.defaultPrice = defaultPrice;
	}

	public Integer getDefaultEquipmentFee() {
		return defaultEquipmentFee;
	}

	public void setDefaultEquipmentFee(Integer defaultEquipmentFee) {
		this.defaultEquipmentFee = defaultEquipmentFee;
	}

	public Integer getDefaultDuration() {
		return defaultDuration;
	}

	public void setDefaultDuration(Integer defaultDuration) {
		this.defaultDuration = defaultDuration;
	}

	public UUID getDefaultLocationID() {
		return defaultLocationID;
	}

	public void setDefaultLocationID(UUID defaultLocationID) {
		this.defaultLocationID = defaultLocationID;
	}

	public Integer getDefaultCapacityAvailable() {
		return defaultCapacityAvailable;
	}

	public void setDefaultCapacityAvailable(Integer defaultCapacityAvailable) {
		this.defaultCapacityAvailable = defaultCapacityAvailable;
	}

	public Integer getDefaultEquipmentAvailable() {
		return defaultEquipmentAvailable;
	}

	public void setDefaultEquipmentAvailable(Integer defaultEquipmentAvailable) {
		this.defaultEquipmentAvailable = defaultEquipmentAvailable;
	}
}
