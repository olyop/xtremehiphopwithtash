import { BookingInput, Session, Student } from "../../generated-types";

export const sessionToBookingInput = (
	{ studentID }: Pick<Student, "studentID">,
	{ sessionID }: Session,
): BookingInput => ({
	sessionID,
	studentID,
	notes: "",
	isBringingOwnEquipment: false,
});
