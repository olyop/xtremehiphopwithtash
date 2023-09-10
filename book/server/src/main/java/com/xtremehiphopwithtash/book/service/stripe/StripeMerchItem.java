package com.xtremehiphopwithtash.book.service.stripe;

import java.net.URL;

public class StripeMerchItem {

	private String merchItemID;
	private String name;
	private String description;
	private Integer price;
	private URL photo;
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

	public URL getPhoto() {
		return photo;
	}

	public void setPhoto(URL photo) {
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
