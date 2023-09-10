package com.xtremehiphopwithtash.book.service.database.review;

import com.xtremehiphopwithtash.book.service.helpers.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityUpdateDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewDAO implements EntityBaseDAO<Review, UUID>, EntityUpdateDAO<Review, UUID>, EntityDeleteDAO<UUID> {

	@Override
	public Review selectByID(UUID id) {
		return null;
	}

	@Override
	public void deleteByID(UUID id) {}

	@Override
	public boolean existsByID(UUID id) {
		return false;
	}

	@Override
	public Review insert(Review value) {
		return null;
	}

	@Override
	public List<Review> select() {
		return null;
	}

	@Override
	public Review updateByID(UUID id, Review value) {
		return null;
	}
}
