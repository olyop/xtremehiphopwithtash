package com.xtremehiphopwithtash.book.service.database.classdescription;

import org.springframework.stereotype.Service;

@Service
public class ClassDescriptionService {

	private final ClassDescriptionDAO classDescriptionDAO;

	public ClassDescriptionService(ClassDescriptionDAO classDescriptionDAO) {
		this.classDescriptionDAO = classDescriptionDAO;
	}

	public String getValue() {
		return classDescriptionDAO.getValue();
	}

	public void updateValue(String value) {
		classDescriptionDAO.updateValue(value);
	}
}
