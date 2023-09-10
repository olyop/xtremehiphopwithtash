package com.xtremehiphopwithtash.book.service.database.image;

import org.springframework.stereotype.Service;

@Service
public class ImageService {

	private final ImageDao imageDAO;

	public ImageService(ImageDao imageDAO) {
		this.imageDAO = imageDAO;
	}
}
