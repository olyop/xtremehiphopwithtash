package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.other.CreatePaymentIntentResponse;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.DetailsService;
import com.xtremehiphopwithtash.book.service.LocationService;
import com.xtremehiphopwithtash.book.service.ReCaptchaService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.StripeService;
import com.xtremehiphopwithtash.book.service.StudentService;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class StripeResolver {

	private final StudentService studentService;
	private final DetailsService detailsService;
	private final SessionService sessionService;
	private final LocationService locationService;
	private final Auth0JwtService auth0JwtService;
	private final StripeService stripeService;
	private final ReCaptchaService reCaptchaService;
	private final BookingService bookingService;

	public StripeResolver(
		StudentService studentService,
		DetailsService detailsService,
		SessionService sessionService,
		LocationService locationService,
		Auth0JwtService auth0JwtService,
		StripeService stripeService,
		ReCaptchaService reCaptchaService,
		BookingService bookingService
	) {
		this.studentService = studentService;
		this.detailsService = detailsService;
		this.sessionService = sessionService;
		this.locationService = locationService;
		this.auth0JwtService = auth0JwtService;
		this.stripeService = stripeService;
		this.reCaptchaService = reCaptchaService;
		this.bookingService = bookingService;
	}

	@MutationMapping
	public CreatePaymentIntentResponse createPaymentIntent(
		@Argument BookingInput input,
		@Argument String reCaptcha,
		Principal principal
	) {
		reCaptchaService.validateResponse(reCaptcha);
		bookingService.validateCreate(input);

		String studentID = auth0JwtService.extractStudentID(principal);

		Student student = studentService.retreiveByID(studentID);
		Details details = detailsService.retreiveByID(student.getDetailsID());

		Session session = sessionService.retreiveByID(input.sessionID());
		Location location = locationService.retreiveByID(session.getLocationID());

		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		dateFormat.setTimeZone(TimeZone.getTimeZone("Australia/Sydney"));
		String date = dateFormat.format(new Date(session.getStartTime().toEpochMilli()));

		String bookingDescription = String.format(
			"Xtreme Hip-Hop with Tash: Session '%s' at %s on %s",
			session.getTitle(),
			location.getName(),
			date
		);

		return stripeService.createPaymentIntent(
			input,
			studentID,
			details.getEmailAddress(),
			student.getStripeCustomerID(),
			bookingDescription
		);
	}
}
