package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.dao.CourseDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.dao.SessionInstructorDAO;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.SessionInstructor;
import com.xtremehiphopwithtash.book.resolver.input.GetSessionsInput;
import com.xtremehiphopwithtash.book.resolver.input.SessionInput;
import com.xtremehiphopwithtash.book.resolver.mapper.SessionInputMapper;
import com.xtremehiphopwithtash.book.resolver.transform.CommonTransform;
import com.xtremehiphopwithtash.book.resolver.validator.SessionValidator;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SessionResolver {

	private SessionInputMapper sessionInputMapper;
	private final SessionDAO sessionDAO;
	private final SessionInstructorDAO sessionInstructorDAO;
	private final InstructorDAO instructorDAO;
	private final SessionValidator sessionValidator;
	private final CourseDAO courseDAO;
	private final LocationDAO locationDAO;
	private final BookingDAO bookingDAO;

	public SessionResolver(
		SessionInputMapper sessionInputMapper,
		SessionDAO sessionDAO,
		SessionInstructorDAO sessionInstructorDAO,
		InstructorDAO instructorDAO,
		SessionValidator sessionValidator,
		CourseDAO courseDAO,
		LocationDAO locationDAO,
		BookingDAO bookingDAO
	) {
		this.sessionInputMapper = sessionInputMapper;
		this.sessionDAO = sessionDAO;
		this.sessionInstructorDAO = sessionInstructorDAO;
		this.instructorDAO = instructorDAO;
		this.sessionValidator = sessionValidator;
		this.courseDAO = courseDAO;
		this.locationDAO = locationDAO;
		this.bookingDAO = bookingDAO;
	}

	@QueryMapping
	public List<Session> getSessions() {
		return sessionDAO.select();
	}

	@QueryMapping
	public Optional<Session> getSessionByID(@Argument UUID sessionID) {
		return sessionDAO.selectByID(sessionID);
	}

	@SchemaMapping(typeName = "Session", field = "course")
	public Course getCourse(Session session) {
		return courseDAO.selectByID(session.getCourseID()).get();
	}

	@SchemaMapping(typeName = "Session", field = "location")
	public Location getLocation(Session session) {
		return locationDAO.selectByID(session.getLocationID()).get();
	}

	@SchemaMapping(typeName = "Session", field = "instructors")
	public List<Instructor> getInstructors(Session session) {
		return instructorDAO.selectsSessionInstructors(session.getSessionID());
	}

	@SchemaMapping(typeName = "Session", field = "bookings")
	public List<Booking> getBookings(Session session) {
		return bookingDAO.selectBySessionID(session.getSessionID());
	}

	@SchemaMapping(typeName = "Session", field = "capacityRemaining")
	public Short getCapacityRemaining(Session session) {
		Short capacityRemaning = bookingDAO.selectCapacityRemaning(session.getSessionID());

		if (capacityRemaning == 0) {
			return null;
		}

		return capacityRemaning;
	}

	@MutationMapping
	public Session createSession(@Argument SessionInput input) {
		sessionValidator.validateCreate(input);

		Session session = sessionInputMapper.map(input);

		Session createdSession = sessionDAO.insert(session);

		handleInstructorsChange(input.instructorIDs(), createdSession.getSessionID());

		return createdSession;
	}

	@MutationMapping
	public Session updateSessionByID(@Argument UUID sessionID, @Argument SessionInput input) {
		sessionValidator.validateUpdate(sessionID, input);

		Session session = sessionInputMapper.map(input);

		Session updatedSession = sessionDAO.updateByID(sessionID, session);

		handleInstructorsChange(input.instructorIDs(), updatedSession.getSessionID());

		return updatedSession;
	}

	@MutationMapping
	public UUID deleteSessionByID(@Argument UUID sessionID) {
		sessionValidator.validateDelete(sessionID);

		sessionInstructorDAO.deleteBySessionID(sessionID);
		sessionDAO.deleteByID(sessionID);

		return sessionID;
	}

	@QueryMapping
	public List<Session> getSessionsInPeriod(@Argument GetSessionsInput input) {
		Optional<UUID> courseID = input.getCourseID();
		Instant startTime = input.getStartTime();
		Instant endTime = input.getEndTime();

		sessionValidator.validateGetSessionsInput(input);

		if (courseID.isPresent()) {
			return sessionDAO.selectInTimePeriodAndCourseID(startTime, endTime, courseID.get());
		} else {
			return sessionDAO.selectInTimePeriod(startTime, endTime);
		}
	}

	@QueryMapping
	public boolean doesSessionExist(@Argument UUID sessionID) {
		return sessionDAO.existsByID(sessionID);
	}

	private void handleInstructorsChange(List<UUID> instructorIDs, UUID sessionID) {
		sessionInstructorDAO.deleteBySessionID(sessionID);

		short instructorIndex = 0;

		for (UUID instructorID : instructorIDs) {
			SessionInstructor sessionInstructor = new SessionInstructor();

			sessionInstructor.setSessionID(sessionID);
			sessionInstructor.setIndex(instructorIndex++);
			sessionInstructor.setInstructorID(instructorID);

			sessionInstructorDAO.insert(sessionInstructor);
		}
	}
}
