package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.GetSessionsInput;
import com.xtremehiphopwithtash.book.resolver.input.SessionInput;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.CourseService;
import com.xtremehiphopwithtash.book.service.InstructorService;
import com.xtremehiphopwithtash.book.service.LocationService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.auth0jwt.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import java.security.Principal;
import java.util.List;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class SessionResolver {

	private final SessionService sessionService;
	private final CourseService courseService;
	private final LocationService locationService;
	private final InstructorService instructorService;
	private final BookingService bookingService;
	private final Auth0JwtService auth0JwtService;
	private final SessionValidator sessionValidator;

	public SessionResolver(
		SessionService sessionService,
		CourseService courseService,
		LocationService locationService,
		InstructorService instructorService,
		BookingService bookingService,
		Auth0JwtService auth0JwtService,
		SessionValidator sessionValidator
	) {
		this.sessionService = sessionService;
		this.courseService = courseService;
		this.locationService = locationService;
		this.instructorService = instructorService;
		this.bookingService = bookingService;
		this.auth0JwtService = auth0JwtService;
		this.sessionValidator = sessionValidator;
	}

	@QueryMapping
	public List<Session> getSessions(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return sessionService.retreiveAll();
	}

	@QueryMapping
	public Session getSessionByID(@Argument UUID sessionID) {
		return sessionService.retreiveByID(sessionID);
	}

	@SchemaMapping(typeName = "Session", field = "course")
	public Course getCourse(Session session) {
		return courseService.retreiveByID(session.getCourseID());
	}

	@SchemaMapping(typeName = "Session", field = "location")
	public Location getLocation(Session session) {
		return locationService.retreiveByID(session.getLocationID());
	}

	@SchemaMapping(typeName = "Session", field = "instructors")
	public List<Instructor> getInstructors(Session session) {
		return instructorService.retreiveSessionInstructors(session.getSessionID());
	}

	@SchemaMapping(typeName = "Session", field = "bookings")
	public List<Booking> getBookings(@AuthenticationPrincipal Jwt jwt, Session session) {
		auth0JwtService.validateAdministrator(jwt);

		List<Booking> bookings = bookingService.retreiveBySessionID(session.getSessionID());

		if (bookings.isEmpty()) {
			return null;
		}

		return bookings;
	}

	@SchemaMapping(typeName = "Session", field = "capacityBooked")
	public Integer getCapacityBooked(Session session) {
		int capacityBooked = bookingService.retreiveCapacityBooked(session.getSessionID());

		if (capacityBooked == 0) {
			return null;
		}

		return capacityBooked;
	}

	@SchemaMapping(typeName = "Session", field = "capacityRemaining")
	public Integer getCapacityRemaining(Session session) {
		int capacityRemaining = bookingService.retreiveCapacityRemaining(session.getSessionID());

		if (capacityRemaining == 0) {
			return null;
		}

		return capacityRemaining;
	}

	@SchemaMapping(typeName = "Session", field = "isCapacityRemaining")
	public Boolean getIsCapacityRemaining(@Argument short bookingQuantity, Session session) {
		return bookingService.retreiveIsCapacityRemaining(session.getSessionID(), bookingQuantity);
	}

	@SchemaMapping(typeName = "Session", field = "equipmentHired")
	public Integer getEquipmentHired(Session session) {
		int equipmentHired = bookingService.retreiveEquipmentHired(session.getSessionID());

		if (equipmentHired == 0) {
			return null;
		}

		return equipmentHired;
	}

	@SchemaMapping(typeName = "Session", field = "equipmentRemaining")
	public Integer getEquipmentRemaining(Session session) {
		int equipmentRemaining = bookingService.retreiveEquipmentRemaining(session.getSessionID());

		if (equipmentRemaining == 0) {
			return null;
		}

		return equipmentRemaining;
	}

	@SchemaMapping(typeName = "Session", field = "isEquipmentRemaining")
	public Boolean getIsEquipmentRemaining(@Argument Short equipmentQuantity, Session session) {
		return bookingService.retreiveIsEquipmentRemaining(session.getSessionID(), equipmentQuantity);
	}

	@SchemaMapping(typeName = "Session", field = "hasBooked")
	public Boolean getHasBooked(Principal principal, Session session) {
		String studentID = auth0JwtService.extractStudentID(principal);

		return bookingService.retreiveHasBooked(session.getSessionID(), studentID);
	}

	@MutationMapping
	public Session createSession(@Argument SessionInput input, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return sessionService.create(input);
	}

	@MutationMapping
	public Session updateSessionByID(
		@Argument UUID sessionID,
		@Argument SessionInput input,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);

		Session session = sessionService.updateByID(sessionID, input);

		bookingService.updateDescriptionsBySessionID(sessionID, sessionService.createBookingDescription(sessionID));

		return session;
	}

	@MutationMapping
	public UUID cancelSessionByID(@Argument UUID sessionID, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return sessionService.cancelByID(sessionID);
	}

	@MutationMapping
	public UUID deleteSessionByID(@Argument UUID sessionID, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return sessionService.deleteByID(sessionID);
	}

	@QueryMapping
	public List<Session> getSessionsInPeriod(@Argument GetSessionsInput input) {
		sessionValidator.validateGetSessionsInput(input);

		return sessionService.retreiveInTimePeriod(input.startTime(), input.endTime());
	}

	@QueryMapping
	public boolean doesSessionExist(@Argument UUID sessionID) {
		return sessionService.existsByID(sessionID);
	}

	@SchemaMapping(typeName = "Session", field = "gross")
	public Integer getGross(@AuthenticationPrincipal Jwt jwt, Session session) {
		auth0JwtService.validateAdministrator(jwt);

		int gross = bookingService.retreiveGrossBySessionID(session.getSessionID());

		if (gross == 0) {
			return null;
		}

		return gross;
	}
}
