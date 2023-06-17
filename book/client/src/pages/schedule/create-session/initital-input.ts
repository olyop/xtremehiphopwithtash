import { SessionInput } from "../../../generated-types";

export const initialCourseDefaultInput: Pick<
	SessionInput,
	| "title"
	| "notes"
	| "price"
	| "equipmentFee"
	| "capacityAvailable"
	| "equipmentAvailable"
	| "locationID"
	| "courseID"
	| "instructorIDs"
> = {
	title: "",
	notes: "",
	price: 10,
	equipmentFee: 2,
	capacityAvailable: 20,
	equipmentAvailable: 10,
	locationID: "",
	courseID: "",
	instructorIDs: [],
};

export const initialInput = ({ startTime }: Pick<SessionInput, "startTime">): SessionInput => {
	const startTimeDate = new Date(startTime);
	startTimeDate.setHours(9, 0, 0, 0);
	return {
		...initialCourseDefaultInput,
		startTime: startTimeDate.getTime(),
		endTime: startTimeDate.getTime(),
	};
};
