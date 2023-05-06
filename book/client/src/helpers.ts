import { Details, Session } from "./generated-types";
import { fullYearDateFormatter, thisYearDateFormatter } from "./intl";

export const determineDetailsName = ({
	firstName,
	lastName,
	nickName,
}: Pick<Details, "firstName" | "lastName" | "nickName">) => nickName || `${firstName} ${lastName}`;

const currentYear = new Date().getFullYear();

export const determineSessionDateLabel = ({ startTime }: Pick<Session, "startTime">) => {
	const date = new Date(startTime);

	const dayName = date.toLocaleDateString(undefined, { weekday: "long" });

	const dateLabel =
		date.getFullYear() === currentYear
			? thisYearDateFormatter.format(date)
			: fullYearDateFormatter.format(date);

	return `${dayName} — ${dateLabel}`;
};

export const determineDetailsFullName = ({
	firstName,
	lastName,
}: Pick<Details, "firstName" | "lastName">) => `${firstName} ${lastName}`;

export const isSessionInProgress = ({
	startTime,
	endTime,
}: Pick<Session, "startTime" | "endTime">) => {
	const now = new Date();
	const time = now.getTime();
	return startTime <= time && time <= endTime;
};
