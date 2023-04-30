package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.dao.inter.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.dao.inter.EntityUpdateDAO;
import com.xtremehiphopwithtash.book.model.Review;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewDAO
	implements EntityBaseDAO<Review, UUID>, EntityUpdateDAO<Review, UUID>, EntityDeleteDAO<UUID> {

	@Override
	public Optional<Review> selectByID(UUID id) {
		return Optional.empty();
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
