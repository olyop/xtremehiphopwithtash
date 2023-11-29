package com.xtremehiphopwithtash.book.service.database.student;

import com.xtremehiphopwithtash.book.graphql.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.database.details.Details;
import com.xtremehiphopwithtash.book.service.database.details.DetailsService;
import com.xtremehiphopwithtash.book.service.helpers.StudentServiceInter;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0ManagementService;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeService;
import com.xtremehiphopwithtash.book.service.validator.StudentValidator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StudentService implements StudentServiceInter<Student, DetailsInput, String> {

	private final StudentDAO studentDAO;
	private final DetailsService detailsService;
	private final StripeService stripeService;
	private final Auth0ManagementService auth0ManagementService;
	private final StudentValidator validator;

	public StudentService(
		StudentDAO studentDAO,
		DetailsService detailsService,
		StripeService stripeService,
		Auth0ManagementService auth0ManagementService,
		StudentValidator validator
	) {
		this.studentDAO = studentDAO;
		this.detailsService = detailsService;
		this.stripeService = stripeService;
		this.auth0ManagementService = auth0ManagementService;
		this.validator = validator;
	}

	@Override
	public List<Student> retreiveAll() {
		return studentDAO.select();
	}

	public int retreiveTotal() {
		return studentDAO.count();
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

		String stripeCustomerID = stripeService.customer().createCustomer(studentID, details);

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

		stripeService.customer().updateCustomer(student.getStripeCustomerID(), details);

		auth0ManagementService.updateUserEmailAddress(studentID, input.emailAddress());

		return student;
	}

	@Override
	public boolean existsByID(String studentID) {
		return studentDAO.existsByID(studentID);
	}
}
