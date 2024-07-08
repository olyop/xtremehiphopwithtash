import { FC, createElement, useContext } from "react";

import SessionCard from "../../components/session-card";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import { isDateInBetweenRange } from "../../helpers/date";
import CreateSession from "./create-session";
import { Day as DayType } from "./types";

const hardcodedUnavailableDayRange = [new Date("2024-06-15T00:00:00"), new Date("2024-06-22T00:00:00")] as const;

const Day: FC<Props> = ({ day, onSessionUpdate }) => {
	const isAdministrator = useContext(IsAdministratorContext);

	const isUnavailable = isDateInBetweenRange(day.unix, hardcodedUnavailableDayRange);

	return (
		<div
			data-unix={day.unix}
			className={`grid grid-cols-[calc((100vw_/_2)_-_0.5rem)] grid-rows-[1.25rem,_1fr] bg-white p-1 pt-0.5 transition-colors md:grid-cols-1 ${
				isUnavailable ? "!bg-orange-100" : day.isToday ? "!bg-gray-200" : day.isInPast ? "opacity-60" : ""
			}`}
		>
			<div className="flex justify-between">
				<p className="select-none justify-self-center overflow-hidden whitespace-nowrap text-sm">{day.label}</p>
				{isAdministrator && !isUnavailable && (day.isToday || !day.isInPast) && (
					<CreateSession day={day} onSubmit={onSessionUpdate} />
				)}
			</div>
			{day.sessions ? (
				<div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden pt-1">
					{day.sessions.map(session => (
						<SessionCard key={session.sessionID} session={session} />
					))}
				</div>
			) : (
				<p className="select-none text-xs text-gray-500">{isUnavailable ? "Tashy on holidays AGAIN" : "No sessions"}</p>
			)}
		</div>
	);
};

interface Props {
	day: DayType;
	onSessionUpdate: () => void;
}

export default Day;
