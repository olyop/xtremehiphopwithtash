import { useApolloClient } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { FC, Fragment, createElement, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import CourseChip from "../../components/course-chip";
import FormError from "../../components/form-error";
import InstructorsChip from "../../components/instructors-chip";
import Loading from "../../components/loading";
import LocationChip from "../../components/location-chip";
import SessionStartTime from "../../components/session-start-end-time";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import {
	Course,
	GetSessionPageQuery,
	GetSessionPageQueryVariables,
	Instructor,
	Location,
	Session,
} from "../../generated-types";
import { determineSessionDateLabel } from "../../helpers/util";
import Page from "../page";
import SessionBookedBanner from "./booked-banner";
import SessionBookings from "./bookings";
import SessionButtons from "./buttons";
import CancelSession from "./cancel-session";
import SessionCancelledBanner from "./cancelled-banner";
import SessionCapacityBanner from "./capacity-banner";
import DeleteSession from "./delete-session";
import GET_SESSION_PAGE from "./get-session-page.graphql";
import { isSessionInPast } from "./helpers";
import SessionPriceBanner from "./price-banner";
import UpdateSession from "./update-session";
import { viewSession } from "./view-session";
import ViewsSession from "./views";
import XtremeHipHopChip from "./xtreme-hip-hop-chip";

const SessionPage: FC = () => {
	const apollo = useApolloClient();
	const { sessionID } = useParams<Pick<Session, "sessionID">>();
	const { isAdministrator } = useContext(IsAdministratorContext);

	const [getQuery, { data, error, loading, refetch }] = useLazyQuery<GetSessionPageQuery, GetSessionPageQueryVariables>(
		GET_SESSION_PAGE,
	);

	const handleRefetch = () => {
		if (sessionID) {
			void refetch({
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

	useEffect(() => {
		if (data && sessionID) {
			viewSession(apollo, sessionID);
		}
	}, [data]);

	if (sessionID === undefined) {
		return <div>Session ID not provided</div>;
	}

	if (error) {
		return (
			<div className="h-content-height w-full p-4">
				<FormError error={error} />
			</div>
		);
	}

	if (loading || !data) {
		return (
			<div className="h-content-height w-full flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	const { getSessionByID: session, getClassDescription } = data;

	const isInPast = isSessionInPast(session);

	return (
		<Page className="flex flex-col">
			{session.isCancelled && <SessionCancelledBanner />}
			<SessionBookedBanner session={session as Session} />
			<SessionCapacityBanner session={session as Session} />
			{!session.isCancelled && <SessionPriceBanner session={session as Session} />}
			<img
				alt={session.course.name}
				src={session.course.photo}
				className="object-cover object-top w-full shadow-lg h-96"
			/>
			<div className="flex flex-col gap-8 p-4 justify-items-start">
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-bold">{session.title}</h1>
					<div className="grid grid-cols-[min-content,auto] grid-rows-2 gap-2 items-center justify-items-start">
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">class</p>
						<XtremeHipHopChip />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">session</p>
						<CourseChip course={session.course as Course} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">with</p>
						<InstructorsChip instructors={session.instructors as Instructor[]} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">at</p>
						<LocationChip location={session.location as Location} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">on</p>
						<p className="text-l pl-0.5">{determineSessionDateLabel(session, true, true)}</p>
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">from</p>
						<p>
							<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
						</p>
						{isAdministrator && (
							<Fragment>
								<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">spots</p>
								<p>
									{session.capacityBooked ?? 0} / {session.capacityAvailable}
								</p>
								<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">steps</p>
								<p>
									{session.equipmentAvailable
										? `${session.equipmentHired ?? 0} / ${session.equipmentAvailable}`
										: "No steps available"}
								</p>
								<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">spots</p>
								<p>
									{session.capacityBooked ?? 0} / {session.capacityAvailable}
								</p>
								<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">views</p>
								<ViewsSession session={session as Session} />
							</Fragment>
						)}
					</div>
				</div>
				<SessionButtons session={session as Session} isInPast={isInPast} />
				{isAdministrator && (
					<div className="flex items-start self-start border rounded p-2">
						<UpdateSession session={session as Session} onEdit={handleRefetch} />
						{!isInPast && (
							<Fragment>
								<CancelSession session={session as Session} />
								<DeleteSession session={session as Session} />
							</Fragment>
						)}
					</div>
				)}
				{session.notes && (
					<div className="rounded border px-4 py-3 flex flex-col gap-2 border-yellow-500 bg-yellow-50">
						<div className="flex gap-2 ml-[-0.2rem] items-center">
							<InformationCircleIcon className="h-5 w-5" />
							<p>Notice</p>
						</div>
						<p>{session.notes}</p>
					</div>
				)}
				<div className="flex flex-col gap-1">
					<h3>Session Details</h3>
					<p className="text-gray-500">{session.course.description}</p>
				</div>
				<div className="flex flex-col gap-1">
					<h3>About Xtreme Hip-Hop</h3>
					<p className="text-gray-500">{getClassDescription}</p>
				</div>
				<div className="flex flex-col justify-start gap-1">
					<h3>Contact Instructors</h3>
					<InstructorsChip instructors={session.instructors as Instructor[]} className="!self-start" showFullName />
				</div>
				{isAdministrator && <SessionBookings session={session as Session} onBookingUpdated={handleRefetch} />}
			</div>
		</Page>
	);
};

export default SessionPage;
