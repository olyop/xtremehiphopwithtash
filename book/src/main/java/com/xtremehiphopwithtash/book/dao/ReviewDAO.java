package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityDAO;
import com.xtremehiphopwithtash.book.model.Review;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewDAO implements EntityDAO<Review, UUID> {

	@Override
	public Optional<Review> selectByID(UUID id) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public boolean deleteByID(UUID id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean existsByID(UUID id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Review insert(Review value) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Review> select() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Review updateByID(UUID id, Review value) {
		// TODO Auto-generated method stub
		return null;
	}
}
