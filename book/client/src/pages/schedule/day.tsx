import { FC, createElement, useContext } from "react";

import SessionCard from "../../components/session-card";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import { isDateInBetweenRange } from "../../helpers/date";
import CreateSession from "./create-session";
import { Day as DayType } from "./types";

const hardcodedUnavailableDayRange = [new Date("2023-10-26T00:00:00"), new Date("2023-10-30T00:00:00")] as const;

const Day: FC<Props> = ({ day, onSessionUpdate }) => {
	const { isAdministrator } = useContext(IsAdministratorContext);

	const isUnavailable = isDateInBetweenRange(day.unix, hardcodedUnavailableDayRange);

	return (
		<div
			data-unix={day.unix}
			className={`bg-white p-1 pt-0.5 overflow-y-auto overflow-x-hidden transition-colors grid grid-rows-[1.25rem,_1fr] grid-cols-[calc((100vw_/_2)_-_0.5rem)] md:grid-cols-1 gap-0.5 ${
				isUnavailable ? "!bg-orange-100" : day.isToday ? "!bg-gray-200" : day.isInPast ? "opacity-60" : ""
			}`}
		>
			<div className="flex justify-between">
				<p className="text-sm select-none justify-self-center whitespace-nowrap overflow-hidden">{day.label}</p>
				{isAdministrator && !isUnavailable && (day.isToday || !day.isInPast) && (
					<CreateSession day={day} onSubmit={onSessionUpdate} />
				)}
			</div>
			{day.sessions ? (
				<div className="flex flex-col gap-1">
					{day.sessions.map(session => (
						<SessionCard key={session.sessionID} session={session} />
					))}
				</div>
			) : (
				<p className="text-xs text-gray-500 select-none">{isUnavailable ? "Tash on holidays" : "No sessions"}</p>
			)}
		</div>
	);
};

interface Props {
	day: DayType;
	onSessionUpdate: () => void;
}

export default Day;
