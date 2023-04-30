package com.xtremehiphopwithtash.book.resolver.input;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.web.ProjectedPayload;

@ProjectedPayload
public interface BookingInput {
	Optional<String> getNotes();
	Boolean getIsBringingOwnEquipment();
	UUID getSessionID();
}
