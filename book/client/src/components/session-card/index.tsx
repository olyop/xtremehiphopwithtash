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
			className={`group/session relative grid transition-all bg-white border border-gray-300 rounded-lg grid-rows-[1fr,3fr] items-stretch h-[6.3rem] ${
				disableLink ? "" : "cursor-pointer"
			} shadow-lg ${className ?? ""}`}
		>
			<div
				className={`absolute inset-0 z-10 invisible transition-opacity bg-gray-400 rounded-lg opacity-0 ${
					disableLink ? "" : "group-hover/session:opacity-30 group-hover/session:visible"
				}`}
			/>
			<SessionCardChips session={session} />
			<img
				src={session.course.photo}
				alt={session.course.name}
				className={`block object-cover object-top w-full h-[2.5rem] rounded-t-lg select-none ${imageClassName ?? ""}`}
			/>
			<div className="flex flex-col px-2 pb-1 pt-0.5 justify-between overflow-hidden">
				<h3 className="font-bold text-[0.9rem] whitespace-nowrap">{session.title}</h3>
				<p className="text-xs font-medium whitespace-nowrap">
					<span className="text-gray-500">at </span>
					{session.location.name}
				</p>
				<p className="text-xs whitespace-nowrap">
					<span className="text-gray-500">from </span>
					<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
				</p>
				{showDate && (
					<p className="text-xs whitespace-nowrap">
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
