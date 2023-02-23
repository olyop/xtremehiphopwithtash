package com.xtremehiphopwithtash.book.model;

import java.net.URL;
import java.util.UUID;

public class Course extends Base {

	private UUID courseID;
	private String name;
	private String description;
	private URL photo;
	private Short defaultPrice;
	private Short defaultCapacity;
	private Short defaultDuration;
	private UUID defaultLocationID;
	private Short defaultEquipmentAvailable;

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

	public Short getDefaultPrice() {
		return defaultPrice;
	}

	public void setDefaultPrice(Short defaultPrice) {
		this.defaultPrice = defaultPrice;
	}

	public Short getDefaultCapacity() {
		return defaultCapacity;
	}

	public void setDefaultCapacity(Short defaultCapacity) {
		this.defaultCapacity = defaultCapacity;
	}

	public Short getDefaultDuration() {
		return defaultDuration;
	}

	public void setDefaultDuration(Short defaultDuration) {
		this.defaultDuration = defaultDuration;
	}

	public UUID getDefaultLocationID() {
		return defaultLocationID;
	}

	public void setDefaultLocationID(UUID defaultLocationID) {
		this.defaultLocationID = defaultLocationID;
	}

	public Short getDefaultEquipmentAvailable() {
		return defaultEquipmentAvailable;
	}

	public void setDefaultEquipmentAvailable(Short defaultEquipmentAvailable) {
		this.defaultEquipmentAvailable = defaultEquipmentAvailable;
	}

	@Override
	public String toString() {
		return (
			"Course [courseID=" +
			courseID +
			", name=" +
			name +
			", description=" +
			description +
			", photo=" +
			photo +
			", defaultPrice=" +
			defaultPrice +
			", defaultCapacity=" +
			defaultCapacity +
			", defaultDuration=" +
			defaultDuration +
			", defaultLocationID=" +
			defaultLocationID +
			", defaultEquipmentAvailable=" +
			defaultEquipmentAvailable +
			"]"
		);
	}
}
