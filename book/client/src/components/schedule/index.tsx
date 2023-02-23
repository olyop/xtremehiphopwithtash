import { FC, createElement } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Schedule: FC = () => (
	<div className="w-full">
		<div className="grid grid-cols-7 grid-rows-1 bg-gray-100 border border-b-0 border-gray-300 border-1">
			{days.map(day => (
				<p
					key={day}
					className="p-2 text-sm font-bold text-center uppercase border-r border-r-gray-300 last:border-r-0"
				>
					{day}
				</p>
			))}
		</div>
		<div className="grid grid-cols-7 grid-rows-4 border-t border-l border-gray-300">
			{Array.from({ length: 28 }).map((x, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<div key={index} className="h-40 border-b border-r border-gray-300" />
			))}
		</div>
	</div>
);

export default Schedule;
