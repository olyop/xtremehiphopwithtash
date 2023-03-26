import { useLazyQuery, useMutation } from "@apollo/client";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import MapPinIcon from "@heroicons/react/24/solid/MapPinIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/button";
import Chip from "../../components/chip";
import BookingInput from "../../components/entity-inputs/booking-input";
import SessionInput from "../../components/entity-inputs/session-input";
import FormError from "../../components/form-error";
import Modal from "../../components/modal";
import SessionStartTime from "../../components/session-start-end-time";
import {
	BookingInput as BookingInputType,
	DeleteSessionMutation,
	DeleteSessionMutationVariables,
	GetSessionPageQuery,
	GetSessionPageQueryVariables,
	Session,
	SessionInput as SessionInputType,
	UpdateSessionMutation,
	UpdateSessionMutationVariables,
} from "../../generated-types";
import { useModal } from "../../hooks";
import { millisecondsToSeconds } from "../../utils";
import BookingModalTitleContent from "./booking-modal-title-content";
import DELETE_SESSION from "./delete-session.graphql";
import GET_SESSION_PAGE from "./get-session-page.graphql";
import SessionSubtitle from "./session-subtitle";
import { sessionToInput } from "./session-to-input";
import UPDATE_SESSION from "./update-session.graphql";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "numeric",
	month: "long",
	weekday: "long",
});

const SessionPage: FC = () => {
	const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
	const [isBookModalOpen, openBookModal, closeBookModal] = useModal();
	const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();

	const { sessionID } = useParams<Pick<Session, "sessionID">>();

	const [getQuery, result] = useLazyQuery<GetSessionPageQuery, GetSessionPageQueryVariables>(
		GET_SESSION_PAGE,
	);

	const [bookingInput, setBookingInput] = useState<BookingInputType>({
		notes: "",
		isBringingOwnEquipment: false,
		sessionID: "",
		studentID: "",
	});

	const [updateInput, setUpdateInput] = useState<SessionInputType>({
		title: "",
		notes: "",
		startTime: 0,
		endTime: 0,
		capacity: 0,
		equipmentAvailable: 0,
		courseID: "",
		instructorIDs: [],
		locationID: "",
		price: 0,
	});

	const [updateSession, updateResult] = useMutation<UpdateData, UpdateVars>(UPDATE_SESSION);
	const [deleteSession, deleteResult] = useMutation<DeleteData, DeleteVars>(DELETE_SESSION);

	const handleUpdateSubmit = () => {
		if (sessionID && updateInput) {
			void updateSession({
				variables: {
					sessionID,
					input: {
						...updateInput,
						startTime: millisecondsToSeconds(updateInput.startTime),
						endTime: millisecondsToSeconds(updateInput.endTime),
					},
				},
			});
		}
	};

	const handleDelete = () => {
		if (sessionID) {
			void deleteSession({
				variables: {
					sessionID,
				},
			});
		}
	};

	useEffect(() => {
		if (updateResult.data) {
			closeEditModal();
		}
	}, [updateResult.data]);

	useEffect(() => {
		if (deleteResult.data) {
			closeDeleteModal();
		}
	}, [deleteResult.data]);

	useEffect(() => {
		if (sessionID) {
			void getQuery({
				variables: { sessionID },
			});
		}
	}, []);

	useEffect(() => {
		if (result.data && sessionID) {
			setUpdateInput(sessionToInput(result.data.getSessionByID));
			setBookingInput(prevState => ({ ...prevState, sessionID }));
		}
	}, [result]);

	if (sessionID === undefined) {
		return <div>Session ID not provided</div>;
	}

	if (!result.data) {
		return <div>Loading...</div>;
	}

	const { getSessionByID: session } = result.data;

	return (
		<div className="flex flex-col gap-4">
			<img
				src={session.course.photo}
				alt={session.course.name}
				className="object-cover w-full shadow-lg h-96"
			/>
			<div className="flex flex-col justify-items-start gap-3 p-4 pt-0">
				<h1 className="text-3xl">{session.title}</h1>
				<div className="grid grid-cols-[min-content,auto] grid-rows-2 gap-2 items-center justify-items-start">
					<p className="text-l text-gray-500 justify-self-end leading-none pr-2">with</p>
					<div className="flex gap-2 self-end">
						{session.instructors.map(instructor => (
							<Chip
								key={instructor.instructorID}
								chip={{
									chipID: instructor.instructorID,
									text: instructor.details.nickName ?? instructor.details.firstName,
									photo: instructor.photo,
								}}
							/>
						))}
					</div>
					<p className="text-l text-gray-500 justify-self-end leading-none pr-2">at</p>
					<Chip
						key={session.location.locationID}
						chip={{
							chipID: session.location.locationID,
							text: session.location.name,
							icon: iconClassName => <MapPinIcon className={iconClassName} />,
						}}
					/>
					<p className="text-l text-gray-500 justify-self-end leading-none pr-2">on</p>
					<p className="text-l pl-0.5">
						<Fragment>{dateFormatter.format(session.startTime)}</Fragment>
						<span className="text-gray-500"> from </span>
						<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
					</p>
					<div />
					<div className="flex gap-4 pt-3">
						<Button
							text="Book Now"
							ariaLabel="Book session"
							onClick={openBookModal}
							textClassName="!text-xl"
							className="h-14 px-6 shadow-xl hover:shadow-xl rounded-xl"
							leftIcon={className => <CalendarIcon className={`${className} h-7 w-7`} />}
						/>
						<Button
							ariaLabel="Edit session"
							onClick={openEditModal}
							className="h-14 w-14 items-center justify-center"
							leftIcon={className => <PencilIcon className={`${className} h-7 w-7`} />}
						/>
						<Button
							ariaLabel="Delete"
							onClick={openDeleteModal}
							className="h-14 w-14 items-center justify-center"
							leftIcon={className => <TrashIcon className={`${className} h-7 w-7`} />}
						/>
						{updateInput && session && (
							<Fragment>
								<Modal
									title="Update Session"
									className="z-30"
									subTitle={
										<SessionSubtitle
											startTime={session.startTime}
											endTime={session.endTime}
											label={dateFormatter.format(session.startTime)}
										/>
									}
									icon={className => <PencilIcon className={className} />}
									isOpen={isEditModalOpen}
									onClose={closeEditModal}
									contentClassName="flex flex-col gap-4"
									children={
										<Fragment>
											<SessionInput input={updateInput} onChange={setUpdateInput} />
											<FormError error={updateResult.error} />
										</Fragment>
									}
									buttons={
										<Fragment>
											<Button
												text={updateResult.loading ? "Updating..." : "Submit"}
												onClick={handleUpdateSubmit}
												ariaLabel={updateResult.loading ? "Updating session" : "Submit"}
												leftIcon={className => <PencilIcon className={className} />}
											/>
											<Button
												transparent
												text="Cancel"
												ariaLabel="Cancel"
												onClick={closeEditModal}
												leftIcon={className => <XMarkIcon className={className} />}
											/>
										</Fragment>
									}
								/>
								<Modal
									title={`Book ${session.title}`}
									disableCloseOnEscape
									icon={className => <CalendarIcon className={className} />}
									isOpen={isBookModalOpen}
									className="z-30"
									isBookingModal
									onClose={closeBookModal}
									contentClassName="flex flex-col gap-4"
									titleContent={<BookingModalTitleContent session={session as Session} />}
									subTitle={
										<SessionSubtitle
											startTime={session.startTime}
											endTime={session.endTime}
											label=""
										/>
									}
									children={
										<Fragment>
											<BookingInput input={bookingInput} onChange={setBookingInput} />
											<FormError error={undefined} />
										</Fragment>
									}
									buttons={
										<Fragment>
											<Button
												text="Next"
												ariaLabel="Next"
												rightIcon={className => <ChevronRightIcon className={className} />}
											/>
											<Button
												transparent
												text="Cancel"
												ariaLabel="Cancel"
												onClick={closeBookModal}
												leftIcon={className => <XMarkIcon className={className} />}
											/>
										</Fragment>
									}
								/>
								<Modal
									title="Delete Session"
									className="z-30"
									subTitle={
										<SessionSubtitle
											startTime={session.startTime}
											endTime={session.endTime}
											label=""
										/>
									}
									icon={className => <TrashIcon className={className} />}
									isOpen={isDeleteModalOpen}
									onClose={closeDeleteModal}
									contentClassName="flex flex-col gap-4"
									children={
										<Fragment>
											<p>Are you sure?</p>
											<FormError error={deleteResult.error} />
										</Fragment>
									}
									buttons={
										<Fragment>
											<Button
												text="Delete"
												ariaLabel="Delete"
												onClick={handleDelete}
												leftIcon={className => <TrashIcon className={className} />}
											/>
											<Button
												transparent
												text="No"
												ariaLabel="Cancel"
												onClick={closeDeleteModal}
												leftIcon={className => <XMarkIcon className={className} />}
											/>
										</Fragment>
									}
								/>
							</Fragment>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

type UpdateData = UpdateSessionMutation;
type UpdateVars = UpdateSessionMutationVariables;
type DeleteData = DeleteSessionMutation;
type DeleteVars = DeleteSessionMutationVariables;

export default SessionPage;
