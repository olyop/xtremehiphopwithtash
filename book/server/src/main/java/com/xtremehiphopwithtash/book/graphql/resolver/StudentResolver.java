package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.graphql.input.DetailsInput;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import com.xtremehiphopwithtash.book.service.database.booking.Booking;
import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.database.details.Details;
import com.xtremehiphopwithtash.book.service.database.details.DetailsService;
import com.xtremehiphopwithtash.book.service.database.student.Student;
import com.xtremehiphopwithtash.book.service.database.student.StudentService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import java.security.Principal;
import java.util.List;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class StudentResolver {

	private final StudentService studentService;
	private final DetailsService detailsService;
	private final BookingService bookingService;
	private final Auth0JwtService auth0JwtService;

	public StudentResolver(
		StudentService studentService,
		DetailsService detailsService,
		BookingService bookingService,
		Auth0JwtService auth0JwtService
	) {
		this.studentService = studentService;
		this.detailsService = detailsService;
		this.bookingService = bookingService;
		this.auth0JwtService = auth0JwtService;
	}

	@QueryMapping
	public List<Student> getStudents(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		List<Student> students = studentService.retreiveAll();

		return students.isEmpty() ? null : students;
	}

	@QueryMapping
	public Integer getStudentsTotal(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		int studentsTotal = studentService.retreiveTotal();

		return studentsTotal == 0 ? null : studentsTotal;
	}

	@QueryMapping
	public Student getStudentByID(Principal principal, @AuthenticationPrincipal Jwt jwt, @Argument String studentID) {
		String studentIDValue;

		if (studentID == null) {
			studentIDValue = auth0JwtService.extractStudentID(principal);
		} else {
			auth0JwtService.validateAdministrator(jwt);

			studentIDValue = studentID;
		}

		return studentService.retreiveByID(studentIDValue);
	}

	@SchemaMapping(typeName = "Student", field = "details")
	public Details getStudentDetails(Student student) {
		return detailsService.retreiveByID(student.getDetailsID());
	}

	@MutationMapping
	public Student createStudent(Principal principal, @Argument DetailsInput input) {
		String studentID = auth0JwtService.extractStudentID(principal);

		return studentService.create(studentID, input);
	}

	@MutationMapping
	public Student updateStudentByID(Principal principal, @Argument DetailsInput input) {
		String studentID = auth0JwtService.extractStudentID(principal);

		return studentService.updateByID(studentID, input);
	}

	@QueryMapping
	public boolean doesStudentExist(Principal principal) {
		String studentID = auth0JwtService.extractStudentID(principal);

		return studentService.existsByID(studentID);
	}

	@QueryMapping
	public boolean isStudentAdministrator(Principal principal, @AuthenticationPrincipal Jwt jwt) {
		String studentID = auth0JwtService.extractStudentID(principal);

		if (!studentService.existsByID(studentID)) {
			return false;
		}

		return auth0JwtService.isAdministrator(jwt);
	}

	@SchemaMapping(typeName = "Student", field = "bookings")
	public List<Booking> getStudentBookings(Student student) {
		List<Booking> bookings = bookingService.retreiveByStudentID(student.getStudentID());

		if (bookings.isEmpty()) {
			return null;
		}

		return bookings;
	}

	@SchemaMapping(typeName = "Student", field = "bookingsTotal")
	public Integer getStudentBookingsTotal(Student student) {
		int bookingsTotal = bookingService.retreiveStudentTotal(student.getStudentID());

		if (bookingsTotal == 0) {
			return null;
		}

		return bookingsTotal;
	}

	@SchemaMapping(typeName = "Student", field = "bookingsTotalPaymentMethodFree")
	public Integer getStudentBookingsTotalPaymentMethodFree(Student student) {
		int bookingsTotal = bookingService.retreiveStudentTotalAndFree(student.getStudentID());

		if (bookingsTotal == 0) {
			return null;
		}

		return bookingsTotal;
	}

	@SchemaMapping(typeName = "Student", field = "bookingsTotalPaymentMethodCard")
	public Integer getStudentBookingsTotalPaymentMethodCard(Student student) {
		int bookingsTotal = bookingService.retreiveStudentTotalAndPaymentMethod(student.getStudentID(), PaymentMethod.CARD);

		if (bookingsTotal == 0) {
			return null;
		}

		return bookingsTotal;
	}

	@SchemaMapping(typeName = "Student", field = "bookingsTotalPaymentMethodCash")
	public Integer getStudentBookingsTotalPaymentMethodCash(Student student) {
		int bookingsTotal = bookingService.retreiveStudentTotalAndPaymentMethod(student.getStudentID(), PaymentMethod.CASH);

		if (bookingsTotal == 0) {
			return null;
		}

		return bookingsTotal;
	}

	@SchemaMapping(typeName = "Query", field = "hasSignedWaiver")
	public boolean getStudentHasSignedWaiver(Principal principal) {
		String studentID = auth0JwtService.extractStudentID(principal);

		return studentService.hasSignedWaiver(studentID);
	}
}
