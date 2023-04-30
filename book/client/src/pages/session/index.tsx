import { useLazyQuery } from "@apollo/client";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { FC, Fragment, createElement, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Chip from "../../components/chip";
import InstructorsChip from "../../components/instructors-chip";
import LocationChip from "../../components/location-chip";
import SessionStartTime from "../../components/session-start-end-time";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import {
	GetSessionPageQuery,
	GetSessionPageQueryVariables,
	Instructor,
	Location,
	Session,
} from "../../generated-types";
import { determineSessionDateLabel } from "../../helpers";
import BookingForm from "./book-session";
import SessionBookings from "./bookings";
import DeleteSession from "./delete-session";
import GET_SESSION_PAGE from "./get-session-page.graphql";
import { isSessionInPast } from "./helpers";
import ShareButton from "./share-button";
import UpdateSession from "./update-session";

const SessionPage: FC = () => {
	const { sessionID } = useParams<Pick<Session, "sessionID">>();
	const { isAdministrator } = useContext(IsAdministratorContext);

	const [getQuery, result] = useLazyQuery<GetSessionPageQuery, GetSessionPageQueryVariables>(
		GET_SESSION_PAGE,
	);

	const handleRefetch = () => {
		if (sessionID) {
			void result.refetch({
				sessionID,
			});
		}
	};

	useEffect(() => {
		if (sessionID) {
			void getQuery({
				variables: { sessionID },
			});
		}
	}, []);

	if (sessionID === undefined) {
		return <div>Session ID not provided</div>;
	}

	if (!result.data) {
		return <div>Loading...</div>;
	}

	const { getSessionByID: session } = result.data;

	const isFree = session.price === null;
	const isInPast = isSessionInPast(session);

	console.log(session.capacityRemaining);

	return (
		<div className="flex flex-col pb-52">
			<div
				className={`flex items-center gap-2 px-4 py-2 ${isFree ? "bg-green-500" : "bg-amber-500"}`}
			>
				{isFree ? (
					<CheckCircleIcon className="w-6 h-6 text-white" />
				) : (
					<InformationCircleIcon className="w-6 h-6 text-white" />
				)}
				<p className="pb-0.5 text-xl font-bold text-white">
					{isFree ? "Free session" : `Price: $A${session.price}`}
				</p>
			</div>
			<img
				src={session.course.photo}
				alt={session.course.name}
				className="object-cover w-full shadow-lg h-96"
			/>
			<div className="flex flex-col gap-8 p-4 justify-items-start">
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-bold">{session.title}</h1>
					<div className="grid grid-cols-[min-content,auto] grid-rows-2 gap-2 items-center justify-items-start">
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">class</p>
						<Chip
							chip={{
								chipID: session.course.courseID,
								text: session.course.name,
								photo: session.course.photo,
							}}
						/>
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">with</p>
						<InstructorsChip instructors={session.instructors as Instructor[]} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">at</p>
						<LocationChip location={session.location as Location} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">on</p>
						<p className="text-l pl-0.5">
							<Fragment>{determineSessionDateLabel(session)}</Fragment>
						</p>
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">from</p>
						<p>
							<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
						</p>
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">spots</p>
						<p>
							{session.capacityRemaining ? (
								<Fragment>
									{session.capacityRemaining} / {session.capacity}
								</Fragment>
							) : (
								"Fully booked"
							)}
						</p>
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">steps</p>
						<p>
							{session.equipmentAvailable}
							<Fragment> available</Fragment>
						</p>
						<div />
						<div className="flex flex-col gap-8 pt-3">
							<div className="flex flex-col gap-4">
								<div className="flex gap-4">
									<BookingForm session={session as Session} isSessionInPast={isInPast} />
									<ShareButton url={location.href} isSessionInPast={isInPast} />
								</div>
								{isAdministrator && (
									<div className="flex gap-4">
										{session && (
											<Fragment>
												<UpdateSession session={session as Session} onEdit={handleRefetch} />
												{!isInPast && <DeleteSession session={session as Session} />}
											</Fragment>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{session.notes && (
					<div className="px-4 py-3 border border-yellow-500 rounded bg-yellow-50 flex gap-2">
						<InformationCircleIcon className="h-6 w-6" />
						<p>{session.notes}</p>
					</div>
				)}
				<div className="flex flex-col gap-1">
					<h3>Course Description</h3>
					<p className="text-gray-500">{session.course.description}</p>
				</div>
				{isAdministrator && <SessionBookings session={session as Session} />}
			</div>
		</div>
	);
};

export default SessionPage;
