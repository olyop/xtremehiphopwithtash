import { SessionInput } from "../../../generated-types";

export const initialCourseDefaultInput: Pick<
	SessionInput,
	| "title"
	| "price"
	| "capacity"
	| "equipmentAvailable"
	| "locationID"
	| "courseID"
	| "instructorIDs"
> = {
	title: "",
	price: 20,
	capacity: 20,
	equipmentAvailable: 10,
	locationID: "",
	courseID: "",
	instructorIDs: [],
};

export const initialInput = ({ startTime }: Pick<SessionInput, "startTime">): SessionInput => {
	const startTimeDate = new Date(startTime);
	startTimeDate.setHours(10, 0, 0, 0);
	return {
		notes: "",
		...initialCourseDefaultInput,
		startTime: startTimeDate.getTime(),
		endTime: startTimeDate.getTime(),
	};
};
