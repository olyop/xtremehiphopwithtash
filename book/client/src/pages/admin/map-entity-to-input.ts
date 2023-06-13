import {
	Course,
	CourseInput,
	Details,
	DetailsInput,
	Instructor,
	InstructorInput,
	Location,
	LocationInput,
} from "../../generated-types";
import { centsToDollars } from "../../utils";

export const mapDetailsToInput = ({
	firstName,
	lastName,
	nickName,
	gender,
	mobilePhoneNumber,
	emailAddress,
	instagramUsername,
}: Details): DetailsInput => ({
	firstName,
	lastName,
	nickName,
	gender,
	mobilePhoneNumber,
	emailAddress,
	instagramUsername,
});

export const mapInstructorToInput = ({ photo, details }: Instructor): InstructorInput => ({
	photo,
	details: mapDetailsToInput(details),
});

export const mapCourseToInput = ({
	name,
	description,
	photo,
	defaultCapacityAvailable,
	defaultEquipmentAvailable,
	defaultPrice,
	defaultEquipmentFee,
	defaultDuration,
	defaultLocation,
	defaultInstructors,
}: Course): CourseInput => ({
	name,
	description,
	photo,
	defaultCapacityAvailable,
	defaultEquipmentAvailable,
	defaultPrice: defaultPrice === null ? null : centsToDollars(defaultPrice),
	defaultEquipmentFee: defaultEquipmentFee === null ? null : centsToDollars(defaultEquipmentFee),
	defaultDuration,
	defaultLocationID: defaultLocation.locationID,
	defaultInstructorIDs: defaultInstructors.map(({ instructorID }) => instructorID),
});

export const mapLocationToInput = ({ name, address, plusCode }: Location): LocationInput => ({
	name,
	address,
	plusCode,
});
