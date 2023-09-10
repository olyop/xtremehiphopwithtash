package com.xtremehiphopwithtash.book.service.validator;

import com.xtremehiphopwithtash.book.graphql.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.database.student.StudentDAO;
import org.springframework.stereotype.Component;

@Component
public class StudentValidator implements ValidatorRU<String, DetailsInput> {

	private final StudentDAO studentDAO;
	private final DetailsValidator detailsValidator;

	public StudentValidator(StudentDAO studentDAO, DetailsValidator detailsValidator) {
		this.studentDAO = studentDAO;
		this.detailsValidator = detailsValidator;
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
