import { CourseInput } from "../../../generated-types";

export const initialInput: CourseInput = {
	name: "",
	description: "",
	photo: "",
	defaultPrice: null,
	defaultEquipmentFee: null,
	defaultDuration: 60 * 45, // 1 hour
	defaultCapacityAvailable: 0,
	defaultEquipmentAvailable: 0,
	defaultLocationID: "",
	defaultInstructorIDs: [],
};
