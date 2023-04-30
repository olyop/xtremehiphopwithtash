import { GetSessionPageQuery, SessionInput } from "../../generated-types";

export const sessionToInput = (session: GetSessionPageQuery["getSessionByID"]): SessionInput => {
	const {
		sessionID,
		capacityRemaining,
		__typename,
		createdAt,
		course,
		location,
		instructors,
		...sessionInput
	} = session;
	return {
		...sessionInput,
		startTime: sessionInput.startTime,
		endTime: sessionInput.endTime,
		courseID: course.courseID,
		locationID: location.locationID,
		instructorIDs: instructors.map(({ instructorID }) => instructorID),
	};
};
