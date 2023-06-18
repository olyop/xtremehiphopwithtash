import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { FC, Fragment, createElement, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import CourseChip from "../../components/course-chip";
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
import { Breakpoint, useBreakpoint } from "../../hooks";
import Page from "../page";
import BookSession from "./book-session";
import SessionBookings from "./bookings";
import SessionCapacityBanner from "./capacity-banner";
import DeleteSession from "./delete-session";
import GET_SESSION_PAGE from "./get-session-page.graphql";
import { isSessionInPast } from "./helpers";
import SessionPriceBanner from "./price-banner";
import ShareButton from "./share-button";
import UpdateSession from "./update-session";

const SessionPage: FC = () => {
	const breakpoint = useBreakpoint();
	const { sessionID } = useParams<Pick<Session, "sessionID">>();
	const { isAdministrator } = useContext(IsAdministratorContext);

	const [getQuery, result] = useLazyQuery<GetSessionPageQuery, GetSessionPageQueryVariables>(GET_SESSION_PAGE);

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
		return (
			<div className="h-content-height w-full flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	const { getSessionByID: session } = result.data;

	const isInPast = isSessionInPast(session);

	return (
		<Page className="flex flex-col">
			<SessionCapacityBanner session={session as Session} />
			<SessionPriceBanner session={session as Session} />
			<img
				src={session.course.photo}
				alt={session.course.name}
				className="object-cover object-top w-full shadow-lg h-96"
			/>
			<div className="flex flex-col gap-8 p-4 justify-items-start">
				<div className="flex flex-col gap-4">
					<h1 className="text-3xl font-bold">{session.title}</h1>
					<div className="grid grid-cols-[min-content,auto] grid-rows-2 gap-2 items-center justify-items-start">
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">class</p>
						<CourseChip course={session.course as Course} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">with</p>
						<InstructorsChip instructors={session.instructors as Instructor[]} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">at</p>
						<LocationChip location={session.location as Location} />
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">on</p>
						<p className="text-l pl-0.5">{determineSessionDateLabel(session)}</p>
						<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">from</p>
						<p>
							<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
						</p>
						{isAdministrator && (
							<Fragment>
								<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">spots</p>
								<p>
									{session.capacityBooked || 0} / {session.capacityAvailable}
								</p>
								<p className="pr-2 leading-none text-gray-500 text-l justify-self-end">steps</p>
								<p>
									{session.equipmentAvailable
										? `${session.equipmentHired || 0} / ${session.equipmentAvailable}`
										: "No steps available"}
								</p>
							</Fragment>
						)}
						{breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL ? null : <div />}
						<div
							className={`"flex flex-col gap-8 pt-3 ${
								breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL ? "col-span-full" : ""
							}`}
						>
							<div className="flex flex-col gap-4">
								<div className="flex gap-4 items-start flex-col md:flex-row">
									<BookSession session={session as Session} isSessionInPast={isInPast} />
									<ShareButton url={location.href} isSessionInPast={isInPast} />
								</div>
								{isAdministrator && (
									<div className="flex">
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
		</Page>
	);
};

export default SessionPage;
