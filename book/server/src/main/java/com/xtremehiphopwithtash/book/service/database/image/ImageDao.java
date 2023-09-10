package com.xtremehiphopwithtash.book.service.database.image;

import com.xtremehiphopwithtash.book.service.helpers.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityUpdateDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public class ImageDao
	implements EntityBaseDAO<ImageItem, UUID>, EntityUpdateDAO<ImageItem, UUID>, EntityDeleteDAO<UUID> {

	@Override
	public ImageItem insert(ImageItem value) {
		throw new UnsupportedOperationException("Unimplemented method 'insert'");
	}

	@Override
	public List<ImageItem> select() {
		throw new UnsupportedOperationException("Unimplemented method 'select'");
	}

	@Override
	public void deleteByID(UUID id) {
		throw new UnsupportedOperationException("Unimplemented method 'deleteByID'");
	}

	@Override
	public ImageItem updateByID(UUID id, ImageItem value) {
		throw new UnsupportedOperationException("Unimplemented method 'updateByID'");
	}

	@Override
	public ImageItem selectByID(UUID id) {
		throw new UnsupportedOperationException("Unimplemented method 'selectByID'");
	}

	@Override
	public boolean existsByID(UUID id) {
		throw new UnsupportedOperationException("Unimplemented method 'existsByID'");
	}
}
