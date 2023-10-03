import { CourseInput } from "../../../generated-types";

export const initialInput: CourseInput = {
	name: "",
	description: "",
	photo: "",
	defaultPrice: 10,
	defaultEquipmentFee: 2,
	defaultDuration: 60 * 45, // 1 hour
	defaultCapacityAvailable: 30,
	defaultEquipmentAvailable: 15,
	defaultLocationID: "",
	defaultInstructorIDs: [],
};
