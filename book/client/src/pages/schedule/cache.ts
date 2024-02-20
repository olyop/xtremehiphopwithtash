import { Day } from "./types";

export const cacheSchedule = (schedule: Day[]) => {
	localStorage.setItem("schedule", JSON.stringify(schedule));
};

export const retreiveCachedSchedule = () => {
	const schedule = localStorage.getItem("schedule");

	if (schedule) {
		return JSON.parse(schedule) as Day[];
	} else {
		return null;
	}
};
