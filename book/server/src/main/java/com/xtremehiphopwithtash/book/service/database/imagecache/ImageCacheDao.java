package com.xtremehiphopwithtash.book.service.database.imagecache;

import com.xtremehiphopwithtash.book.service.helpers.EntityBaseDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public class ImageCacheDao implements EntityBaseDAO<UUID, ImageCacheItem> {

	@Override
	public UUID insert(UUID value) {
		throw new UnsupportedOperationException("Unimplemented method 'insert'");
	}

	@Override
	public List<UUID> select() {
		throw new UnsupportedOperationException("Unimplemented method 'select'");
	}

	@Override
	public UUID selectByID(ImageCacheItem id) {
		throw new UnsupportedOperationException("Unimplemented method 'selectByID'");
	}

	@Override
	public boolean existsByID(ImageCacheItem id) {
		throw new UnsupportedOperationException("Unimplemented method 'existsByID'");
	}
}
