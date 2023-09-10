package com.xtremehiphopwithtash.book.service.database.session;

import com.xtremehiphopwithtash.book.graphql.input.SessionInput;
import com.xtremehiphopwithtash.book.service.database.location.Location;
import com.xtremehiphopwithtash.book.service.database.location.LocationService;
import com.xtremehiphopwithtash.book.service.database.session.instructor.SessionInstructor;
import com.xtremehiphopwithtash.book.service.database.session.instructor.SessionInstructorDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityServiceInter;
import com.xtremehiphopwithtash.book.service.validator.CourseValidator;
import com.xtremehiphopwithtash.book.service.validator.LocationValidator;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class SessionService implements EntityServiceInter<Session, SessionInput, UUID> {

	private final SessionDAO sessionDAO;
	private final SessionInstructorDAO sessionInstructorDAO;
	private final SessionValidator validator;
	private final CourseValidator courseValidator;
	private final LocationValidator locationValidator;
	private final SessionInputMapper sessionInputMapper;
	private final LocationService locationService;
	private final DateTimeFormatter sessionDateTimeFormatter;

	public SessionService(
		SessionDAO sessionDAO,
		SessionInstructorDAO sessionInstructorDAO,
		SessionValidator validator,
		CourseValidator courseValidator,
		LocationValidator locationValidator,
		SessionInputMapper sessionInputMapper,
		LocationService locationService
	) {
		this.sessionDAO = sessionDAO;
		this.sessionInstructorDAO = sessionInstructorDAO;
		this.validator = validator;
		this.courseValidator = courseValidator;
		this.locationValidator = locationValidator;
		this.sessionInputMapper = sessionInputMapper;
		this.locationService = locationService;

		DateTimeFormatter sessionDateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		sessionDateTimeFormatter = sessionDateTimeFormatter.withZone(TimeZone.getTimeZone("Australia/Sydney").toZoneId());
		this.sessionDateTimeFormatter = sessionDateTimeFormatter;
	}

	@Override
	public List<Session> retreiveAll() {
		return sessionDAO.select();
	}

	@Override
	public Session retreiveByID(UUID sessionID) {
		validator.validateID(sessionID);

		return sessionDAO.selectByID(sessionID);
	}

	@Override
	public Session create(SessionInput input) {
		validator.validateCreate(input);

		Session session = sessionInputMapper.map(input);

		Session createdSession = sessionDAO.insert(session);

		handleInstructorsChange(input.instructorIDs(), createdSession.getSessionID());

		return createdSession;
	}

	@Override
	public Session updateByID(UUID sessionID, SessionInput input) {
		validator.validateUpdate(sessionID, input);

		Session session = sessionInputMapper.map(input);

		Session updatedSession = sessionDAO.updateByID(sessionID, session);

		handleInstructorsChange(input.instructorIDs(), updatedSession.getSessionID());

		return updatedSession;
	}

	@Override
	public boolean existsByID(UUID sessionID) {
		return sessionDAO.existsByID(sessionID);
	}

	@Override
	public UUID deleteByID(UUID sessionID) {
		validator.validateDelete(sessionID);

		sessionInstructorDAO.deleteBySessionID(sessionID);
		sessionDAO.deleteByID(sessionID);

		return sessionID;
	}

	public UUID cancelByID(UUID sessionID) {
		validator.validateCancel(sessionID);

		sessionDAO.cancelByID(sessionID);

		return sessionID;
	}

	public String createBookingDescription(UUID sessionID) {
		validator.validateID(sessionID);

		Session session = sessionDAO.selectByID(sessionID);
		Location location = locationService.retreiveByID(session.getLocationID());
		String date = sessionDateTimeFormatter.format(session.getStartTime());

		return String.format("Session: '%s' at '%s' on %s", session.getTitle(), location.getName(), date);
	}

	public List<Session> retreiveByCourseID(UUID courseID) {
		courseValidator.validateID(courseID);

		return sessionDAO.selectByCourseID(courseID);
	}

	public List<Session> retreiveByLocationID(UUID locationID) {
		locationValidator.validateID(locationID);

		return sessionDAO.selectByLocationID(locationID);
	}

	public List<Session> retreiveByInstructorID(UUID instructorID) {
		validator.validateID(instructorID);

		return sessionDAO.selectByInstructorID(instructorID);
	}

	public List<Session> retreiveInTimePeriod(Instant startTime, Instant endTime) {
		return sessionDAO.selectInTimePeriod(startTime, endTime);
	}

	public List<Session> retreiveInTimePeriodExcludeSession(Instant startTime, Instant endTime, UUID sessionID) {
		return sessionDAO.selectInTimePeriodExcludeSession(startTime, endTime, sessionID);
	}

	public List<Session> retreiveInTimePeriodByCourseID(Instant startTime, Instant endTime, UUID courseID) {
		courseValidator.validateID(courseID);

		return sessionDAO.selectInTimePeriodAndCourseID(startTime, endTime, courseID);
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
