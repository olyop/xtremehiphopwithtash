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

export const initialInput: SessionInput = {
	notes: "",
	...initialCourseDefaultInput,
	startTime: Date.now(),
	endTime: Date.now(),
};
