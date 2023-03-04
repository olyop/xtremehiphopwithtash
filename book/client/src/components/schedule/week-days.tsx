import { FC, createElement } from "react";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeekDays: FC = () => (
	<div className="grid grid-cols-7 bg-slate-500">
		{dayNames.map(day => (
			<p key={day} className="p-2 text-sm text-white font-bold text-center uppercase">
				{day}
			</p>
		))}
	</div>
);

export default WeekDays;
