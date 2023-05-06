package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.StudentDAO;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.Auth0Management;
import org.springframework.stereotype.Component;

@Component
public class StudentValidator implements ValidatorRU<String, DetailsInput> {

	private final StudentDAO studentDAO;
	private final DetailsValidator detailsValidator;
	private final Auth0Management auth0Management;

	public StudentValidator(
		StudentDAO studentDAO,
		DetailsValidator detailsValidator,
		Auth0Management auth0Management
	) {
		this.studentDAO = studentDAO;
		this.detailsValidator = detailsValidator;
		this.auth0Management = auth0Management;
	}

	public void validateCreate(DetailsInput input, String studentID) {
		validateIDDoesNotExist(studentID);
		validateInput(input);
	}

	@Override
	public void validateUpdate(String studentID, DetailsInput input) {
		validateID(studentID);
		validateInput(input);
	}

	@Override
	public void validateID(String studentID) {
		if (!studentDAO.existsByID(studentID)) {
			throw new ResolverException("Student does not exist");
		}

		if (!auth0Management.doesUserExist(studentID)) {
			throw new ResolverException("Student does not exist");
		}
	}

	@Override
	public void validateInput(DetailsInput input) {
		detailsValidator.validateInput(input);
	}

	public void validateIDDoesNotExist(String studentID) {
		if (studentDAO.existsByID(studentID)) {
			throw new ResolverException("Student already exists");
		}
	}
}
