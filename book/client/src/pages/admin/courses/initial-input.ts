import { CourseInput } from "../../../generated-types";

export const initialInput: CourseInput = {
	name: "",
	description: "",
	photo: "",
	defaultPrice: 10,
	defaultEquipmentFee: 2,
	defaultDuration: 60 * 60, // 1 hour
	defaultCapacity: 30,
	defaultEquipmentAvailable: 30,
	defaultLocationID: "",
	defaultInstructorIDs: [],
};
