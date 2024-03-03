import { FC, createElement } from "react";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeekDays: FC = () => (
	<div className="hidden h-9 grid-cols-7 bg-slate-500 lg:grid">
		{dayNames.map(day => (
			<p key={day} className="p-2 text-center text-sm font-bold uppercase text-white">
				{day}
			</p>
		))}
	</div>
);

export default WeekDays;
