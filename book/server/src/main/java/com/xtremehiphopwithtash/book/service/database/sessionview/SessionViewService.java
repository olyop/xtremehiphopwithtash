package com.xtremehiphopwithtash.book.service.database.sessionview;

import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import com.xtremehiphopwithtash.book.service.validator.StudentValidator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class SessionViewService {

	private final SessionViewDAO sessionViewDAO;
	private final SessionValidator sessionValidator;
	private final StudentValidator studentValidator;

	public SessionViewService(
		SessionViewDAO sessionViewDAO,
		SessionValidator sessionValidator,
		StudentValidator studentValidator
	) {
		this.sessionViewDAO = sessionViewDAO;
		this.sessionValidator = sessionValidator;
		this.studentValidator = studentValidator;
	}

	public SessionView retreiveByID(UUID sessionID, String studentID) {
		return sessionViewDAO.selectByID(sessionID, studentID);
	}

	public SessionView save(UUID sessionID, String studentID) {
		sessionValidator.validateID(sessionID);
		studentValidator.validateID(studentID);

		if (exists(sessionID, studentID)) {
			return retreiveByID(sessionID, studentID);
		}

		SessionView sessionView = new SessionView();

		sessionView.setSessionID(sessionID);
		sessionView.setStudentID(studentID);

		return sessionViewDAO.insert(sessionView);
	}

	private boolean exists(UUID sessionID, String studentID) {
		return sessionViewDAO.existsByID(sessionID, studentID);
	}

	public int retreiveCountBySessionID(UUID sessionID) {
		return sessionViewDAO.selectCountBySessionID(sessionID);
	}

	public List<SessionView> retreiveBySessionID(UUID sessionID) {
		return sessionViewDAO.selectBySessionID(sessionID);
	}
}
