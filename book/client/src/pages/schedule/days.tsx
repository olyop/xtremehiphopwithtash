import { FC, createElement } from "react";

import Day from "./day";
import { Day as DayType } from "./types";

const Days: FC<Props> = ({ days, onSessionUpdate }) => (
	<div className="grid gap-px grid-cols-2 border-t lg:border-r border-gray-300 grid-rows-3 md:grid-cols-3 md:grid-rows-4 bg-gray-300 lg:border-b-0 lg:grid-cols-7 lg:grid-rows-4 h-[calc(100vh_-_5rem_-_3.25rem)] lg:h-[calc(100vh_-_5rem_-_2.25rem)]">
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
