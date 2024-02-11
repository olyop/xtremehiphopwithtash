package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.database.sessionview.SessionView;
import com.xtremehiphopwithtash.book.service.database.student.Student;
import com.xtremehiphopwithtash.book.service.database.student.StudentService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class SessionViewResolver {

	private final StudentService studentService;
	private final BookingService bookingService;
	private final Auth0JwtService auth0JwtService;

	public SessionViewResolver(
		StudentService studentService,
		BookingService bookingService,
		Auth0JwtService auth0JwtService
	) {
		this.studentService = studentService;
		this.bookingService = bookingService;
		this.auth0JwtService = auth0JwtService;
	}

	@SchemaMapping(typeName = "SessionView", field = "student")
	public Student getSessionViewStudent(@AuthenticationPrincipal Jwt jwt, SessionView sessionView) {
		auth0JwtService.validateAdministrator(jwt);

		String studentID = sessionView.getStudentID();

		return studentService.retreiveByID(studentID);
	}

	@SchemaMapping(typeName = "SessionView", field = "hasBooked")
	public boolean getSessionViewHasBooked(@AuthenticationPrincipal Jwt jwt, SessionView sessionView) {
		auth0JwtService.validateAdministrator(jwt);

		return bookingService.retreiveHasBooked(sessionView.getSessionID(), sessionView.getStudentID());
	}

	@SchemaMapping(typeName = "SessionView", field = "hasCancelled")
	public boolean getSessionViewHasCancelled(@AuthenticationPrincipal Jwt jwt, SessionView sessionView) {
		auth0JwtService.validateAdministrator(jwt);

		return bookingService.retreiveHasCancelled(sessionView.getSessionID(), sessionView.getStudentID());
	}
}
