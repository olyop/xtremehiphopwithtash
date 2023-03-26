import { FC, createElement } from "react";

import { Breakpoint } from "../../hooks";
import CreateSession from "./create-session";
import SessionCard from "./session-card";
import { Day as DayType } from "./types";

const Day: FC<PropTypes> = ({ day, breakpoint, onSessionUpdate }) => (
	<div
		data-unix={day.unix}
		className={`bg-white p-1 overflow-x-hidden transition-colors grid grid-rows-[1.25rem,_1fr] gap-0.5 ${
			day.isToday ? "!bg-gray-200" : day.isInPast ? "!bg-gray-100" : ""
		}`}
	>
		<div className="flex justify-between">
			<p className="text-sm uppercase select-none justify-self-center">
				{breakpoint === Breakpoint.SMALL || breakpoint === Breakpoint.MEDIUM
					? `${day.dayNameShort} — ${day.label}`
					: day.label}
			</p>
			<CreateSession day={day} onSubmit={onSessionUpdate} />
		</div>
		{day.sessions ? (
			<div className="flex flex-col gap-1">
				{day.sessions?.slice(0, 2).map(session => (
					<SessionCard key={session.sessionID} session={session} />
				))}
			</div>
		) : (
			<p className="text-xs text-gray-500 select-none">No sessions</p>
		)}
	</div>
);

interface PropTypes {
	day: DayType;
	breakpoint: Breakpoint;
	onSessionUpdate: () => void;
}

export default Day;
