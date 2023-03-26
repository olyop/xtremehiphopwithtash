import { FC, createElement } from "react";
import { Link } from "react-router-dom";

import { Session } from "../../../generated-types";
import SessionStartTime from "../../session-start-end-time";
import "./index.scss";

const SessionCard: FC<PropTypes> = ({ session }) => (
	<div
		data-id={session.sessionID}
		className="group/session relative grid transition-all bg-white border border-gray-300 rounded-lg grid-rows-[1fr,3fr] items-stretch h-32 cursor-pointer"
	>
		<Link to={`session/${session.sessionID}`}>
			<div className="absolute inset-0 z-10 invisible transition-opacity bg-gray-400 rounded-lg opacity-0 group-hover/session:opacity-30 group-hover/session:visible" />
			<div className="absolute flex items-end gap-1 right-1.5 -top-1 z-10">
				<p className="rounded shadow uppercase text-xs p-0.5 text-white font-bold bg-amber-500 select-none">
					{session.capacityRemaining === 0 ? "Fully Booked" : `${session.capacityRemaining} spots`}
				</p>
				{session.price === null && (
					<p className="rounded shadow uppercase text-xs font-bold text-white p-0.5 bg-green-500 select-none">
						Free
					</p>
				)}
			</div>
			<img
				src={session.course.photo}
				alt={session.course.name}
				className="block object-cover w-full h-16 rounded-t-lg select-none"
			/>
			<div className="flex flex-col px-2 pb-1 pt-0.5 justify-between overflow-hidden">
				<h3 className="font-bold text-md whitespace-nowrap">{session.title}</h3>
				<p className="text-xs font-medium whitespace-nowrap">
					<span className="text-gray-500">at </span>
					{session.location.name}
				</p>
				<p className="text-xs whitespace-nowrap">
					<span className="text-gray-500">from </span>
					<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
				</p>
			</div>
		</Link>
	</div>
);

interface PropTypes {
	session: Session;
}

export default SessionCard;
