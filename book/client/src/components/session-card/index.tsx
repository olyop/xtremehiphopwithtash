import { FC, createElement } from "react";
import { Link } from "react-router-dom";

import { Session } from "../../generated-types";
import { determineSessionDateLabel } from "../../helpers/util";
import SessionStartTime from "../session-start-end-time";
import SessionCardChips from "./chips";

const SessionCard: FC<Props> = ({ session, className, imageClassName, disableLink = false, showDate = false }) => {
	const content = (
		<div
			data-id={session.sessionID}
			className={`group/session relative grid h-[6.3rem] grid-rows-[1fr,3fr] items-stretch rounded-lg border border-gray-300 bg-white transition-all ${
				disableLink ? "" : "cursor-pointer"
			} shadow-lg ${className ?? ""}`}
		>
			<div
				className={`invisible absolute inset-0 z-10 rounded-lg bg-gray-400 opacity-0 transition-opacity ${
					disableLink ? "" : "group-hover/session:visible group-hover/session:opacity-30"
				}`}
			/>
			<SessionCardChips session={session} />
			<img
				src={session.course.photo}
				alt={session.course.name}
				className={`block h-[2.5rem] w-full select-none rounded-t-lg object-cover object-top ${imageClassName ?? ""}`}
			/>
			<div className="flex flex-col justify-between overflow-hidden px-2 pb-1 pt-0.5">
				<h3 className="whitespace-nowrap text-[0.9rem] font-bold">{session.title}</h3>
				<p className="whitespace-nowrap text-xs font-medium">
					<span className="text-gray-500">at </span>
					{session.location.name}
				</p>
				<p className="whitespace-nowrap text-xs">
					<span className="text-gray-500">from </span>
					<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
				</p>
				{showDate && (
					<p className="whitespace-nowrap text-xs">
						<span className="text-gray-500">on </span>
						{determineSessionDateLabel(session, true, true)}
					</p>
				)}
			</div>
		</div>
	);

	return disableLink ? (
		content
	) : (
		<Link to={`session/${session.sessionID}`} className="block">
			{content}
		</Link>
	);
};
interface Props {
	session: Session;
	className?: string;
	disableLink?: boolean;
	imageClassName?: string;
	showDate?: boolean;
}

export default SessionCard;
