import { Session, SessionInput } from "../../../generated-types";
import { secondsToMilliseconds } from "../../../utils";

export const sessionToInput = (session: Session): SessionInput => {
	const { sessionID, createdAt, course, location, instructors, ...sessionInput } = session;
	return {
		...sessionInput,
		startTime: secondsToMilliseconds(sessionInput.startTime),
		endTime: secondsToMilliseconds(sessionInput.endTime),
		courseID: course.courseID,
		locationID: location.locationID,
		instructorIDs: instructors.map(({ instructorID }) => instructorID),
	};
};
