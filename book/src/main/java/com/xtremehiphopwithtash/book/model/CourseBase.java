package com.xtremehiphopwithtash.book.model;

import java.net.URL;
import java.util.UUID;

public class CourseBase {

	private String name;
	private String description;
	private URL photo;
	private Short defaultPrice;
	private Short defaultCapacity;
	private Short defaultDuration;
	private UUID defaultLocationID;
	private Short defaultEquipmentAvailable;

	public CourseBase(
		String name,
		String description,
		URL photo,
		Short defaultPrice,
		Short defaultCapacity,
		Short defaultDuration,
		UUID defaultLocationID,
		Short defaultEquipmentAvailable
	) {
		this.name = name;
		this.description = description;
		this.photo = photo;
		this.defaultPrice = defaultPrice;
		this.defaultCapacity = defaultCapacity;
		this.defaultDuration = defaultDuration;
		this.defaultLocationID = defaultLocationID;
		this.defaultEquipmentAvailable = defaultEquipmentAvailable;
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
}
