package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.CourseDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.dao.SessionInstructorDAO;
import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.SessionInstructor;
import com.xtremehiphopwithtash.book.resolver.input.GetSessionsInput;
import com.xtremehiphopwithtash.book.resolver.input.SessionInput;
import com.xtremehiphopwithtash.book.resolver.transformer.CommonTransformer;
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

	private final SessionDAO sessionDAO;
	private final SessionInstructorDAO sessionInstructorDAO;
	private final InstructorDAO instructorDAO;
	private final SessionValidator sessionValidator;
	private final CourseDAO courseDAO;
	private final LocationDAO locationDAO;

	public SessionResolver(
		SessionDAO sessionDAO,
		SessionInstructorDAO sessionInstructorDAO,
		InstructorDAO instructorDAO,
		SessionValidator sessionValidator,
		CourseDAO courseDAO,
		LocationDAO locationDAO
	) {
		this.sessionDAO = sessionDAO;
		this.sessionInstructorDAO = sessionInstructorDAO;
		this.instructorDAO = instructorDAO;
		this.sessionValidator = sessionValidator;
		this.courseDAO = courseDAO;
		this.locationDAO = locationDAO;
	}

	@QueryMapping
	public List<Session> getSessions() {
		return sessionDAO.select();
	}

	@QueryMapping
	public Optional<Session> getSessionByID(UUID sessionID) {
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

	@MutationMapping
	public Session createSession(@Argument SessionInput input) {
		String title = CommonTransformer.transformName(input.getTitle());
		Optional<String> notes = input.getNotes();
		Optional<Short> price = input.getPrice();
		Instant startTime = input.getStartTime();
		Instant endTime = input.getEndTime();
		Short capacity = input.getCapacity();
		Short equipmentAvailable = input.getEquipmentAvailable();
		UUID courseID = input.getCourseID();
		UUID locationID = input.getLocationID();
		List<UUID> instructorIDs = input.getInstructorIDs();

		sessionValidator.validateInput(input);
		sessionValidator.validateIsNotInPast(startTime);
		sessionValidator.validateSessionInPeriodExists(startTime, endTime);

		Session session = new Session();
		session.setTitle(title);
		session.setNotes(notes.orElse(null));
		session.setPrice(price.orElse(null));
		session.setStartTime(startTime);
		session.setEndTime(endTime);
		session.setCapacity(capacity);
		session.setEquipmentAvailable(equipmentAvailable);
		session.setCourseID(courseID);
		session.setLocationID(locationID);

		Session savedSession = sessionDAO.insert(session);
		handleInstructors(instructorIDs, savedSession.getSessionID());

		return savedSession;
	}

	@MutationMapping
	public Session updateSessionByID(@Argument UUID sessionID, @Argument SessionInput input) {
		String title = input.getTitle();
		Optional<String> notes = input.getNotes();
		Optional<Short> price = input.getPrice();
		Instant startTime = input.getStartTime();
		Instant endTime = input.getEndTime();
		Short capacity = input.getCapacity();
		Short equipmentAvailable = input.getEquipmentAvailable();
		UUID courseID = input.getCourseID();
		UUID locationID = input.getLocationID();
		List<UUID> instructorIDs = input.getInstructorIDs();

		sessionValidator.validateID(sessionID);
		sessionValidator.validateInput(input);
		sessionValidator.validateStartAndEndTimeHaveNotChanged(sessionID, startTime, endTime);

		Session session = new Session();
		session.setTitle(title);
		session.setNotes(notes.orElse(null));
		session.setPrice(price.orElse(null));
		session.setStartTime(startTime);
		session.setEndTime(endTime);
		session.setCapacity(capacity);
		session.setEquipmentAvailable(equipmentAvailable);
		session.setCourseID(courseID);
		session.setLocationID(locationID);

		Session updatedSession = sessionDAO.updateByID(sessionID, session);
		handleInstructors(instructorIDs, updatedSession.getSessionID());

		return updatedSession;
	}

	@MutationMapping
	public UUID deleteSessionByID(@Argument UUID sessionID) {
		sessionValidator.validateID(sessionID);
		sessionValidator.canDelete(sessionID);

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

	private void handleInstructors(List<UUID> instructorIDs, UUID sessionID) {
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
