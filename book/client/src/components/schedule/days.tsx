import { FC, createElement } from "react";

import { Breakpoint } from "../../hooks";
import Day from "./day";
import { Schedule } from "./types";

const Days: FC<PropTypes> = ({ schedule, breakpoint, onSessionUpdate }) => (
	<div className="h-full border border-gray-300 grid gap-px grid-cols-2 grid-rows-4 md:grid-cols-3 md:grid-rows-4 bg-gray-300 lg:border-t-0 lg:grid-cols-7 lg:grid-rows-4">
		{schedule.days.map(day => (
			<Day key={day.unix} day={day} breakpoint={breakpoint} onSessionUpdate={onSessionUpdate} />
		))}
	</div>
);

interface PropTypes {
	schedule: Schedule;
	breakpoint: Breakpoint;
	onSessionUpdate: () => void;
}

export default Days;
