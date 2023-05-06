import { FC, createElement, useContext } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import SessionCard from "../session-card";
import CreateSession from "./create-session";
import { Day as DayType } from "./types";

const Day: FC<PropTypes> = ({ day, onSessionUpdate }) => {
	const { isAdministrator } = useContext(IsAdministratorContext);
	return (
		<div
			data-unix={day.unix}
			className={`bg-white p-1 overflow-y-auto overflow-x-hidden transition-colors grid grid-rows-[1.25rem,_1fr] grid-cols-[calc((100vw_/_2)_-_0.5rem)] md:grid-cols-1 gap-0.5 ${
				day.isToday ? "!bg-gray-200" : day.isInPast ? "opacity-60" : ""
			}`}
		>
			<div className="flex justify-between">
				<p className="text-sm select-none justify-self-center">{day.label}</p>
				{isAdministrator && (day.isToday || !day.isInPast) && (
					<CreateSession day={day} onSubmit={onSessionUpdate} />
				)}
			</div>
			{day.sessions ? (
				<div className="flex flex-col gap-1">
					{day.sessions?.map(session => (
						<SessionCard key={session.sessionID} session={session} />
					))}
				</div>
			) : (
				<p className="text-xs text-gray-500 select-none">No sessions</p>
			)}
		</div>
	);
};

interface PropTypes {
	day: DayType;
	onSessionUpdate: () => void;
}

export default Day;
