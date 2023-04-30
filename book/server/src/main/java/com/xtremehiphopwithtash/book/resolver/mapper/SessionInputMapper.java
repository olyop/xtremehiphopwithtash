package com.xtremehiphopwithtash.book.resolver.mapper;

import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.resolver.input.SessionInput;
import com.xtremehiphopwithtash.book.resolver.transform.CommonTransform;
import org.springframework.stereotype.Component;

@Component
public class SessionInputMapper implements InputMapper<SessionInput, Session> {

	@Override
	public Session map(SessionInput input) {
		Session session = new Session();

		session.setTitle(CommonTransform.transformText(input.title()));
		session.setNotes(CommonTransform.transformText(input.notes()));
		session.setPrice(input.price().orElse(null));
		session.setEquipmentFee(input.equipmentFee().orElse(null));
		session.setStartTime(input.startTime());
		session.setEndTime(input.endTime());
		session.setCapacity(input.capacity());
		session.setEquipmentAvailable(input.equipmentAvailable().orElse(null));
		session.setCourseID(input.courseID());
		session.setLocationID(input.locationID());

		return session;
	}
}
