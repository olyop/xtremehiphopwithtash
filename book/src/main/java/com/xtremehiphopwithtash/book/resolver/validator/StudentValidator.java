package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.StudentDAO;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import org.springframework.stereotype.Component;

@Component
public class StudentValidator implements Validator<String, DetailsInput> {

	private final StudentDAO studentDAO;

	public StudentValidator(StudentDAO studentDAO) {
		this.studentDAO = studentDAO;
	}

	@Override
	public void validateID(String studentID) {
		if (!studentDAO.existsByID(studentID)) {
			throw new ResolverException("Student does not exist");
		}
	}

	@Override
	public void validateInput(DetailsInput input) {
		// TODO Auto-generated method stub

	}
}
