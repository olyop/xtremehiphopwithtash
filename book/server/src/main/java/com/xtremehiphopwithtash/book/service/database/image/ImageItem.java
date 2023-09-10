package com.xtremehiphopwithtash.book.service.database.image;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.util.UUID;

public class ImageItem extends BaseModel {

	private UUID imageID;
	private byte[] data;

	public UUID getImageID() {
		return imageID;
	}

	public void setImageID(UUID imageID) {
		this.imageID = imageID;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}
