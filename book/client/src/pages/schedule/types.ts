import { Session } from "../../generated-types";

export interface Day {
	unix: number;
	isInPast: boolean;
	isToday: boolean;
	label: string;
	sessions: Session[] | null;
}

export type OnDayClick = (unixTime: number) => () => void;
