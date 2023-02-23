package com.xtremehiphopwithtash.book.resolver.input;

import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface BookingInput {
	String getNotes();
	Boolean isBringingOwnEquipment();
	UUID getSessionID();
	String getStudentID();
}
