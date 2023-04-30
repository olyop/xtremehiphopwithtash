package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.StudentDAO;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import org.springframework.stereotype.Component;

@Component
public class StudentValidator implements Validator<String, DetailsInput> {

	private final StudentDAO studentDAO;
	private final DetailsValidator detailsValidator;

	public StudentValidator(StudentDAO studentDAO, DetailsValidator detailsValidator) {
		this.studentDAO = studentDAO;
		this.detailsValidator = detailsValidator;
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
