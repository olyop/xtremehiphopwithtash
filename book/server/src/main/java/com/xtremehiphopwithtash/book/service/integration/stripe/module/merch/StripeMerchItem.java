package com.xtremehiphopwithtash.book.service.integration.stripe.module.merch;

import java.net.URL;
import java.time.Instant;

public class StripeMerchItem {

	private String merchItemID;
	private String name;
	private String description;
	private Integer price;
	private URL photo;
	private boolean isInStock;
	private boolean isLowStock;
	private boolean isPreOrder;
	private String[] sizesAvailable;
	private Instant updatedAt;

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

	public boolean isInStock() {
		return isInStock;
	}

	public void setInStock(boolean isInStock) {
		this.isInStock = isInStock;
	}

	public boolean isLowStock() {
		return isLowStock;
	}

	public void setIsLowStock(boolean isLowStock) {
		this.isLowStock = isLowStock;
	}

	public boolean isPreOrder() {
		return isPreOrder;
	}

	public void setIsPreOrder(boolean isPreOrder) {
		this.isPreOrder = isPreOrder;
	}

	public String[] getSizesAvailable() {
		return sizesAvailable;
	}

	public void setSizesAvailable(String[] sizesAvailable) {
		this.sizesAvailable = sizesAvailable;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}
}
