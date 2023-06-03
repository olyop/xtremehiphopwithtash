package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.service.inputmapper.DetailsInputMapper;
import com.xtremehiphopwithtash.book.service.inter.EntityServiceInter;
import com.xtremehiphopwithtash.book.service.validator.DetailsValidator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class DetailsService implements EntityServiceInter<Details, DetailsInput, UUID> {

	private final DetailsDAO detailsDAO;
	private final DetailsInputMapper inputMapper;
	private final DetailsValidator validator;

	public DetailsService(
		DetailsDAO detailsDAO,
		DetailsInputMapper inputMapper,
		DetailsValidator validator
	) {
		this.detailsDAO = detailsDAO;
		this.inputMapper = inputMapper;
		this.validator = validator;
	}

	@Override
	public List<Details> retreiveAll() {
		return detailsDAO.select();
	}

	@Override
	public Details retreiveByID(UUID detailsID) {
		validator.validateID(detailsID);

		return detailsDAO.selectByID(detailsID);
	}

	@Override
	public Details create(DetailsInput input) {
		validator.validateInput(input);

		Details details = inputMapper.map(input);

		return detailsDAO.insert(details);
	}

	@Override
	public Details updateByID(UUID detailsID, DetailsInput input) {
		validator.validateID(detailsID);
		validator.validateInput(input);

		Details details = inputMapper.map(input);

		return detailsDAO.updateByID(detailsID, details);
	}

	@Override
	public UUID deleteByID(UUID detailsID) {
		validator.validateID(detailsID);

		detailsDAO.deleteByID(detailsID);

		return detailsID;
	}

	@Override
	public boolean existsByID(UUID detailsID) {
		return detailsDAO.existsByID(detailsID);
	}

	public List<String> retrieveGenders() {
		return detailsDAO.selectGenders();
	}
}
