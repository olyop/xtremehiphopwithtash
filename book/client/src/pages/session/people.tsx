import { FC, createElement } from "react";

const SessionPeople: FC<SessionPeopleProps> = ({ people }) => (
	<div
		className="relative h-4 select-none overflow-hidden rounded-full"
		style={{
			width: (people.length - 1) * 16,
		}}
	>
		<div className="bg-opacity-t absolute right-0 z-20 h-full w-2/3 bg-gradient-to-l from-white to-transparent" />
		{people.map((photo, index) => (
			<img
				key={photo}
				src={photo}
				alt={photo}
				className="absolute z-10 rounded-full shadow-2xl"
				style={{ left: index * (16 - 4), width: 16, height: 16 }}
			/>
		))}
	</div>
);

export interface SessionPeopleProps {
	people: readonly string[];
}

export default SessionPeople;
