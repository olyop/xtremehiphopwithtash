package com.xtremehiphopwithtash.book.model;

import java.net.URI;

public class MerchItem {

	private String merchItemID;
	private String name;
	private String description;
	private Integer price;
	private URI photo;
	private Integer stock;
	private String[] sizesAvailable;

	public String getMerchItemID() {
		return merchItemID;
	}

	public void setMerchItemID(String merchItemID) {
		this.merchItemID = merchItemID;
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

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public URI getPhoto() {
		return photo;
	}

	public void setPhoto(URI photo) {
		this.photo = photo;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public String[] getSizesAvailable() {
		return sizesAvailable;
	}

	public void setSizesAvailable(String[] sizesAvailable) {
		this.sizesAvailable = sizesAvailable;
	}
}
