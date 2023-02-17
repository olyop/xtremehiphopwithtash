package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.SessionDAO;
import com.xtremehiphopwithtash.book.dao.SessionInstructorDAO;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.SessionInstructor;
import com.xtremehiphopwithtash.book.resolver.input.SessionInput;
import com.xtremehiphopwithtash.book.resolver.validator.SessionValidator;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SessionResolver {

	private final SessionDAO sessionDAO;
	private final SessionInstructorDAO sessionInstructorDAO;
	private final SessionValidator sessionValidator;

	public SessionResolver(
		SessionDAO sessionDAO,
		SessionInstructorDAO sessionInstructorDAO,
		SessionValidator sessionValidator
	) {
		this.sessionDAO = sessionDAO;
		this.sessionInstructorDAO = sessionInstructorDAO;
		this.sessionValidator = sessionValidator;
	}

	@QueryMapping
	public List<Session> getSessions() {
		return this.sessionDAO.select();
	}

	@QueryMapping
	public Optional<Session> getSessionByID(UUID sessionID) {
		return this.sessionDAO.selectByID(sessionID);
	}

	@MutationMapping
	public Session createSession(@Argument SessionInput input) {
		String title = input.getTitle();
		String notes = input.getNotes();
		Optional<Short> price = input.getPrice();
		Instant startTime = input.getStartTime();
		Instant endTime = input.getEndTime();
		Short capacity = input.getCapacity();
		Short equipmentAvailable = input.getEquipmentAvailable();
		UUID courseID = input.getCourseID();
		UUID locationID = input.getLocationID();
		List<UUID> instructorIDs = input.getInstructorIDs();

		sessionValidator.validateInput(input);

		Session session = new Session();
		session.setTitle(title);
		session.setNotes(notes);
		session.setPrice(price.get());
		session.setStartTime(startTime);
		session.setEndTime(endTime);
		session.setCapacity(capacity);
		session.setEquipmentAvailable(equipmentAvailable);
		session.setCourseID(courseID);
		session.setLocationID(locationID);

		Session savedSession = sessionDAO.insert(session);

		short instructorIndex = 0;
		for (UUID instructorID : instructorIDs) {
			SessionInstructor sessionInstructor = new SessionInstructor();
			sessionInstructor.setSessionID(courseID);
			sessionInstructor.setIndex(instructorIndex++);
			sessionInstructor.setInstructorID(instructorID);

			sessionInstructorDAO.insert(sessionInstructor);
		}

		return savedSession;
	}

	@MutationMapping
	public Session updateSession(@Argument UUID sessionID, @Argument SessionInput input) {
		String title = input.getTitle();
		String notes = input.getNotes();
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

		Session session = new Session();
		session.setTitle(title);
		session.setNotes(notes);
		session.setPrice(price.get());
		session.setStartTime(startTime);
		session.setEndTime(endTime);
		session.setCapacity(capacity);
		session.setEquipmentAvailable(equipmentAvailable);
		session.setCourseID(courseID);
		session.setLocationID(locationID);

		Session savedSession = sessionDAO.updateByID(sessionID, session);

		sessionInstructorDAO.deleteBySessionID(sessionID);

		short instructorIndex = 0;
		for (UUID instructorID : instructorIDs) {
			SessionInstructor sessionInstructor = new SessionInstructor();
			sessionInstructor.setSessionID(sessionID);
			sessionInstructor.setIndex(instructorIndex++);
			sessionInstructor.setInstructorID(instructorID);

			sessionInstructorDAO.insert(sessionInstructor);
		}

		return savedSession;
	}

	@MutationMapping
	public UUID deleteSessionByID(@Argument UUID sessionID) {
		sessionValidator.validateID(sessionID);

		sessionInstructorDAO.deleteBySessionID(sessionID);
		sessionDAO.deleteByID(sessionID);

		return sessionID;
	}
}
