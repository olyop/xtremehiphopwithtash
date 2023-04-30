import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import { atcb_action } from "add-to-calendar-button";
import { FC, createElement } from "react";

import { Session } from "../../generated-types";
import { determineDetailsName } from "../../helpers";
import Button from "../button";

const addZeroOrNot = (value: number) => (value < 10 ? `0${value}` : value);

const AddToCalender: FC<PropTypes> = ({ session, hideText = false }) => {
	const start = new Date(session.startTime);
	const end = new Date(session.endTime);

	const data: Parameters<typeof atcb_action>[0] = {
		name: `${session.course.name} with ${session.instructors
			.map(instructor => determineDetailsName(instructor.details))
			.join(", ")}`,
		iCalFileName: "Reminder-Event",
		location: `${session.location.coordinates.latitude},${session.location.coordinates.longitude}`,
		description: `${session.title} - ${session.location.name} - ${session.notes || "No notes"}`,
		options: ["Google", "iCal", "Microsoft365", "Outlook.com"],
		timeZone: "Australia/Sydney",
		startDate: `${start.getFullYear()}-${addZeroOrNot(start.getMonth() + 1)}-${start.getDate()}`,
		startTime: `${addZeroOrNot(start.getHours())}:${addZeroOrNot(start.getMinutes())}`,
		endTime: `${addZeroOrNot(end.getHours())}:${addZeroOrNot(end.getMinutes())}`,
	};

	const handleClick = () => {
		atcb_action(data);
	};

	return (
		<Button
			transparent
			onClick={handleClick}
			ariaLabel="Add booking to calender"
			text={hideText ? undefined : "Add to Calender"}
			leftIcon={className => <CalendarIcon className={className} />}
		/>
	);
};

interface PropTypes {
	session: Session;
	hideText?: boolean;
}

export default AddToCalender;
