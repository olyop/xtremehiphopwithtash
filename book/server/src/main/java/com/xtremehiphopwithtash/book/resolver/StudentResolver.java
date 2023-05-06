package com.xtremehiphopwithtash.book.resolver;

import com.auth0.exception.Auth0Exception;
import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.StudentDAO;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.resolver.mapper.DetailsInputMapper;
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

	private final DetailsInputMapper detailsInputMapper;
	private final StudentDAO studentDAO;
	private final DetailsDAO detailsDAO;
	private final BookingDAO bookingDAO;
	private final Auth0Management auth0Management;
	private final StudentValidator studentValidator;

	public StudentResolver(
		DetailsInputMapper detailsInputMapper,
		StudentDAO studentDAO,
		DetailsDAO detailsDAO,
		BookingDAO bookingDAO,
		Auth0Management auth0Management,
		StudentValidator studentValidator
	) {
		this.detailsInputMapper = detailsInputMapper;
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

	@SchemaMapping(typeName = "Student", field = "bookings")
	public List<Booking> getStudentBookings(Student student) {
		List<Booking> bookings = bookingDAO.selectByStudentID(student.getStudentID());

		if (bookings.isEmpty()) {
			return null;
		}

		return bookings;
	}

	@SchemaMapping(typeName = "Student", field = "bookingsTotal")
	public Short getStudentBookingsTotal(Student student) {
		short bookingsTotal = bookingDAO.selectCountByStudentID(student.getStudentID());

		if (bookingsTotal == 0) {
			return null;
		}

		return bookingsTotal;
	}

	@MutationMapping
	public Student createStudent(@Argument String studentID, @Argument DetailsInput input) {
		studentValidator.validateCreate(input, studentID);

		Details details = detailsInputMapper.map(input);

		Details savedDetails = detailsDAO.insert(details);

		Student student = new Student();
		student.setStudentID(studentID);
		student.setDetailsID(savedDetails.getDetailsID());

		return studentDAO.insert(student);
	}

	@MutationMapping
	public Student updateStudentByID(@Argument String studentID, @Argument DetailsInput input) {
		studentValidator.validateUpdate(studentID, input);

		Student student = studentDAO.selectByID(studentID).get();

		Details details = detailsInputMapper.map(input);

		detailsDAO.updateByID(student.getDetailsID(), details);

		return student;
	}

	@QueryMapping
	public boolean doesStudentExist(@Argument String studentID) {
		return studentDAO.existsByID(studentID);
	}

	@QueryMapping
	public boolean isStudentAdministator(@Argument String studentID) throws Auth0Exception {
		if (!studentDAO.existsByID(studentID)) {
			return false;
		}

		return auth0Management.isUserAdministrator(studentID);
	}
}
