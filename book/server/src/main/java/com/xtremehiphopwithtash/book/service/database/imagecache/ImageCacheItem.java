package com.xtremehiphopwithtash.book.service.database.imagecache;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.time.Instant;
import java.util.UUID;

public class ImageCacheItem extends BaseModel {

	private UUID imageCacheID;
	private byte[] data;
	private Instant expiresAt;

	public UUID getImageCacheID() {
		return imageCacheID;
	}

	public void setImageCacheID(UUID imageCacheID) {
		this.imageCacheID = imageCacheID;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public Instant getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(Instant expiresAt) {
		this.expiresAt = expiresAt;
	}
}
