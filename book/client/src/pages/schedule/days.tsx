import { FC, createElement } from "react";

import Day from "./day";
import { Day as DayType } from "./types";

const Days: FC<Props> = ({ days, onSessionUpdate }) => (
	<div className="grid h-[calc(100vh_-_5rem_-_3.25rem)] grid-cols-2 grid-rows-3 gap-px border-t border-gray-300 bg-gray-300 md:grid-cols-3 md:grid-rows-4 lg:h-[calc(100vh_-_5rem_-_2.25rem)] lg:grid-cols-7 lg:grid-rows-4 lg:border-b-0 lg:border-r">
		{days.map(day => (
			<Day key={day.unix} day={day} onSessionUpdate={onSessionUpdate} />
		))}
	</div>
);

interface Props {
	days: DayType[];
	onSessionUpdate: () => void;
}

export default Days;
