import { Session } from "../../generated-types";

export interface Day {
	unix: number;
	isToday: boolean;
	label: string;
	dayName: string;
	sessions: Session[] | null;
}

export interface Schedule {
	startingTime: number;
	days: Day[];
}

export type OnDayClick = (unixTime: number) => () => void;
