package com.xtremehiphopwithtash.book.service.database.session;

import com.xtremehiphopwithtash.book.graphql.input.SessionInput;
import com.xtremehiphopwithtash.book.service.helpers.CommonTransform;
import com.xtremehiphopwithtash.book.service.helpers.InputMapper;
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
		session.setCapacityAvailable(input.capacityAvailable());
		session.setEquipmentAvailable(input.equipmentAvailable().orElse(null));
		session.setCourseID(input.courseID());
		session.setLocationID(input.locationID());

		return session;
	}
}
