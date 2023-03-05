import { FC, createElement } from "react";

import CreateSession from "./create-session";
import SessionCard from "./session-card";
import { Day as DayType } from "./types";

const Day: FC<PropTypes> = ({ day, onCreateSession }) => (
	<div
		data-unix={day.unix}
		className={`bg-white p-1 transition-colors flex flex-col gap-1 ${
			day.isToday ? "!bg-gray-200" : ""
		}`}
	>
		<div className="flex justify-between">
			<p className="text-sm select-none justify-self-center">{day.label}</p>

			<CreateSession day={day} onSubmit={onCreateSession} />
		</div>
		{day.sessions && (
			<div className="grid grid-rows-2 gap-1">
				{day.sessions.slice(0, 2).map(session => (
					<SessionCard key={session.sessionID} day={day} session={session} />
				))}
			</div>
		)}
	</div>
);

interface PropTypes {
	day: DayType;
	onCreateSession: () => void;
}

export default Day;
