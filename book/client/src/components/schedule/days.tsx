import { FC, createElement } from "react";

import Day from "./day";
import { Schedule } from "./types";

const Days: FC<PropTypes> = ({ schedule }) => (
	<div className="border border-gray-300 border-t-0 bg-gray-300 grid gap-px grid-cols-7 grid-rows-[repeat(4,_10rem)]">
		{schedule.days.map(day => (
			<Day key={day.unix} day={day} />
		))}
	</div>
);

interface PropTypes {
	schedule: Schedule;
}

export default Days;
