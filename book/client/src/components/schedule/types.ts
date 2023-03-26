import { Session } from "../../generated-types";

export interface Day {
	unix: number;
	isInPast: boolean;
	isToday: boolean;
	label: string;
	dayNameShort: string;
	dayNameLong: string;
	sessions: Session[] | null;
}

export interface Schedule {
	startingTime: number;
	days: Day[];
}

export type OnDayClick = (unixTime: number) => () => void;
