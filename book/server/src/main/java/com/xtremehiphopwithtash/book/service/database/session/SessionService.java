package com.xtremehiphopwithtash.book.service.database.session;

import com.xtremehiphopwithtash.book.graphql.input.SessionInput;
import com.xtremehiphopwithtash.book.service.database.location.Location;
import com.xtremehiphopwithtash.book.service.database.location.LocationService;
import com.xtremehiphopwithtash.book.service.database.session.instructor.SessionInstructor;
import com.xtremehiphopwithtash.book.service.database.session.instructor.SessionInstructorDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityServiceInter;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.TimeZone;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class SessionService implements EntityServiceInter<Session, SessionInput, UUID> {

	private final SessionDAO sessionDAO;
	private final SessionInstructorDAO sessionInstructorDAO;
	private final SessionValidator validator;
	private final SessionInputMapper sessionInputMapper;
	private final LocationService locationService;
	private final DateTimeFormatter dateTimeFormatter;

	public SessionService(
		SessionDAO sessionDAO,
		SessionInstructorDAO sessionInstructorDAO,
		SessionValidator validator,
		SessionInputMapper sessionInputMapper,
		LocationService locationService
	) {
		this.sessionDAO = sessionDAO;
		this.sessionInstructorDAO = sessionInstructorDAO;
		this.validator = validator;
		this.sessionInputMapper = sessionInputMapper;
		this.locationService = locationService;

		this.dateTimeFormatter =
			DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm").withZone(TimeZone.getTimeZone("Australia/Sydney").toZoneId());
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
		String date = dateTimeFormatter.format(session.getStartTime());

		return String.format("Session: '%s' at '%s' on %s", session.getTitle(), location.getName(), date);
	}

	public List<Session> retreiveInTimePeriod(Instant startTime, Instant endTime) {
		return sessionDAO.selectInTimePeriod(startTime, endTime);
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
