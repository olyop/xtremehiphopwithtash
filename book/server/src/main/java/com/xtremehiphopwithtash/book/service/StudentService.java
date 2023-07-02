package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.dao.StudentDAO;
import com.xtremehiphopwithtash.book.service.inter.StudentServiceInter;
import com.xtremehiphopwithtash.book.service.validator.StudentValidator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StudentService implements StudentServiceInter<Student, DetailsInput, String> {

	private final StudentDAO studentDAO;
	private final DetailsService detailsService;
	private final StripeService stripeService;
	private final StudentValidator validator;

	public StudentService(
		StudentDAO studentDAO,
		DetailsService detailsService,
		StripeService stripeService,
		StudentValidator validator
	) {
		this.studentDAO = studentDAO;
		this.detailsService = detailsService;
		this.stripeService = stripeService;
		this.validator = validator;
	}

	@Override
	public List<Student> retreiveAll() {
		return studentDAO.select();
	}

	@Override
	public Student retreiveByID(String studentID) {
		validator.validateID(studentID);

		return studentDAO.selectByID(studentID);
	}

	@Override
	public Student create(DetailsInput input) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Student create(String studentID, DetailsInput input) {
		validator.validateCreate(input, studentID);

		Details details = detailsService.create(input);

		String stripeCustomerID = stripeService.createCustomer(studentID, details);

		Student student = new Student();
		student.setStudentID(studentID);
		student.setDetailsID(details.getDetailsID());
		student.setStripeCustomerID(stripeCustomerID);

		Student savedStudent = studentDAO.insert(student);

		return savedStudent;
	}

	@Override
	public Student updateByID(String studentID, DetailsInput input) {
		validator.validateID(studentID);
		validator.validateUpdate(studentID, input);

		Student student = studentDAO.selectByID(studentID);
		Details details = detailsService.updateByID(student.getDetailsID(), input);

		detailsService.updateByID(details.getDetailsID(), input);

		stripeService.updateCustomer(student.getStripeCustomerID(), details);

		return student;
	}

	@Override
	public boolean existsByID(String studentID) {
		return studentDAO.existsByID(studentID);
	}
}
