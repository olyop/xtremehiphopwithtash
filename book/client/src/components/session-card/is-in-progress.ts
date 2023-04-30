import { Session } from "../../generated-types";

export const isInProgress = ({ startTime, endTime }: Session) => {
	const now = new Date();
	const time = now.getTime();
	return startTime <= time && time <= endTime;
};
