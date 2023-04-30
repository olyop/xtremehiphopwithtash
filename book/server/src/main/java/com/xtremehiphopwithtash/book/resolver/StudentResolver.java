package com.xtremehiphopwithtash.book.resolver;

import com.auth0.exception.Auth0Exception;
import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.StudentDAO;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.resolver.validator.StudentValidator;
import com.xtremehiphopwithtash.book.service.Auth0Management;
import java.util.List;
import java.util.Optional;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class StudentResolver {

	private final StudentDAO studentDAO;
	private final DetailsDAO detailsDAO;
	private final BookingDAO bookingDAO;
	private final Auth0Management auth0Management;
	private final StudentValidator studentValidator;

	public StudentResolver(
		StudentDAO studentDAO,
		DetailsDAO detailsDAO,
		BookingDAO bookingDAO,
		Auth0Management auth0Management,
		StudentValidator studentValidator
	) {
		this.studentDAO = studentDAO;
		this.detailsDAO = detailsDAO;
		this.bookingDAO = bookingDAO;
		this.auth0Management = auth0Management;
		this.studentValidator = studentValidator;
	}

	@QueryMapping
	public List<Student> getStudents() {
		return studentDAO.select();
	}

	@QueryMapping
	public Optional<Student> getStudentByID(@Argument String studentID) {
		return studentDAO.selectByID(studentID);
	}

	@SchemaMapping(typeName = "Student", field = "details")
	public Optional<Details> getStudentDetails(Student student) {
		return detailsDAO.selectByID(student.getDetailsID());
	}

	@MutationMapping
	public Student createStudent(@Argument String studentID, @Argument DetailsInput input) {
		String firstName = input.getFirstName();
		String lastName = input.getLastName();
		Optional<String> nickName = input.getNickName();
		Optional<String> gender = input.getGender();
		String mobilePhoneNumber = input.getMobilePhoneNumber();
		Optional<String> instagramUsername = input.getInstagramUsername();

		studentValidator.validateIDDoesNotExist(studentID);
		studentValidator.validateInput(input);

		Details details = new Details();
		details.setFirstName(firstName);
		details.setLastName(lastName);
		details.setNickName(nickName.orElse(null));
		details.setGender(gender.orElse(null));
		details.setMobilePhoneNumber(mobilePhoneNumber);
		details.setInstagramUsername(instagramUsername.orElse(null));

		Details savedDetails = detailsDAO.insert(details);

		Student student = new Student();
		student.setStudentID(studentID);
		student.setDetailsID(savedDetails.getDetailsID());

		return studentDAO.insert(student);
	}

	@MutationMapping
	public Student updateStudentByID(@Argument String studentID, @Argument DetailsInput input) {
		String firstName = input.getFirstName();
		String lastName = input.getLastName();
		Optional<String> nickName = input.getNickName();
		Optional<String> gender = input.getGender();
		String mobilePhoneNumber = input.getMobilePhoneNumber();
		Optional<String> instagramUsername = input.getInstagramUsername();

		studentValidator.validateID(studentID);
		studentValidator.validateInput(input);

		Student student = studentDAO.selectByID(studentID).get();

		Details details = new Details();
		details.setFirstName(firstName);
		details.setLastName(lastName);
		details.setNickName(nickName.orElse(null));
		details.setGender(gender.orElse(null));
		details.setMobilePhoneNumber(mobilePhoneNumber);
		details.setInstagramUsername(instagramUsername.orElse(null));

		detailsDAO.updateByID(student.getDetailsID(), details);

		return student;
	}

	@QueryMapping
	public boolean doesStudentExist(@Argument String studentID) {
		return studentDAO.existsByID(studentID);
	}

	@SchemaMapping(typeName = "Student", field = "bookings")
	public List<Booking> getStudentBookings(Student student) {
		return bookingDAO.selectByStudentID(student.getStudentID());
	}

	@QueryMapping
	public boolean isStudentAdministator(@Argument String studentID) throws Auth0Exception {
		if (!studentDAO.existsByID(studentID)) {
			throw new IllegalArgumentException("Student does not exist");
		}

		return auth0Management.isUserAdministrator(studentID);
	}
}
