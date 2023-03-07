import { useMutation } from "@apollo/client";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, ReactNode, createElement, useEffect, useState } from "react";

import {
	DeleteSessionMutation,
	DeleteSessionMutationVariables,
	Session,
	SessionInput as SessionInputType,
	UpdateSessionMutation,
	UpdateSessionMutationVariables,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import { millisecondsToSeconds, secondsToMilliseconds } from "../../../utils";
import Button from "../../button";
import FormError from "../../form-error";
import Modal from "../../modal";
import { timeFormatter } from "../helpers";
import SessionInput from "../session-input";
import { Day } from "../types";
import DELETE_SESSION from "./delete-session.graphql";
import "./index.scss";
import { sessionToInput } from "./session-to-input";
import UPDATE_SESSION from "./update-session.graphql";

const SessionCard: FC<PropTypes> = ({ session, day, onSessionUpdate }) => {
	const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
	const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();

	const [input, setInput] = useState<SessionInputType>(sessionToInput(session));

	const [updateSession, updateResult] = useMutation<UpdateData, UpdateVars>(UPDATE_SESSION);
	const [deleteSession, deleteResult] = useMutation<DeleteData, DeleteVars>(DELETE_SESSION);

	const handleSubmit = () => {
		void updateSession({
			variables: {
				sessionID: session.sessionID,
				input: {
					...input,
					startTime: millisecondsToSeconds(input.startTime),
					endTime: millisecondsToSeconds(input.endTime),
				},
			},
		});
	};

	const handleDelete = () => {
		void deleteSession({
			variables: {
				sessionID: session.sessionID,
			},
		});
	};

	const sessionStartAndEndTime: ReactNode = (
		<Fragment>
			{timeFormatter.format(secondsToMilliseconds(session.startTime))}
			<Fragment> </Fragment>
			<span className="text-gray-500">to</span>
			<Fragment> </Fragment>
			{timeFormatter.format(secondsToMilliseconds(session.endTime))}
		</Fragment>
	);

	useEffect(() => {
		if (updateResult.data) {
			closeEditModal();
			onSessionUpdate();
		}
	}, [updateResult.data]);

	useEffect(() => {
		if (deleteResult.data) {
			closeDeleteModal();
			onSessionUpdate();
		}
	}, [deleteResult.data]);

	return (
		<Fragment>
			<div
				data-id={session.sessionID}
				className="relative flex flex-col justify-between p-1 transition-all bg-white border border-gray-300 rounded-lg SessionCard"
			>
				<div className="absolute inset-0 z-10 invisible transition-opacity bg-gray-400 rounded-lg opacity-0 SessionCard__blur" />
				<div className="absolute inset-0 z-20 flex items-center justify-center invisible gap-2 transition-opacity opacity-0 SessionCard__buttons">
					<Button
						ariaLabel="Edit session"
						onClick={openEditModal}
						leftIcon={className => <PencilIcon className={className} />}
					/>
					<Button
						text="Book"
						ariaLabel="Book session"
						onClick={() => console.log("Book session")}
						leftIcon={className => <CalendarIcon className={className} />}
					/>
					<Button
						ariaLabel="Delete"
						onClick={openDeleteModal}
						leftIcon={className => <TrashIcon className={className} />}
					/>
				</div>
				<div className="flex items-start justify-start gap-1">
					<img
						src={session.course.photo}
						alt={session.course.name}
						className="mt-1 select-none h-7 w-7 rounded-2xl"
					/>
					<div className="flex flex-col">
						<h3 className="font-bold text-md">{session.title}</h3>
						<p className="text-xs font-medium ">
							<span className="text-gray-500">at </span>
							{session.location.name}
						</p>
						<p className="text-xs">
							<span className="text-gray-500">from </span>
							{sessionStartAndEndTime}
						</p>
					</div>
				</div>
			</div>
			<Modal
				title="Update Session"
				className="z-30"
				subTitle={
					<Fragment>
						{sessionStartAndEndTime}
						<Fragment> on </Fragment>
						{new Date(day.unix).toLocaleDateString()}
					</Fragment>
				}
				icon={className => <PencilIcon className={className} />}
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				contentClassName="flex flex-col gap-4"
				children={
					<Fragment>
						<SessionInput input={input} onChange={setInput} />
						<FormError error={updateResult.error} />
					</Fragment>
				}
				buttons={
					<Button
						text={updateResult.loading ? "Updating..." : "Submit"}
						onClick={handleSubmit}
						ariaLabel={updateResult.loading ? "Updating session" : "Submit"}
						leftIcon={className => <PencilIcon className={className} />}
					/>
				}
			/>
			<Modal
				title="Delete Session"
				className="z-30"
				subTitle={
					<Fragment>
						{sessionStartAndEndTime}
						<Fragment> on </Fragment>
						{new Date(day.unix).toLocaleDateString()}
					</Fragment>
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
	);
};

type UpdateData = UpdateSessionMutation;
type UpdateVars = UpdateSessionMutationVariables;
type DeleteData = DeleteSessionMutation;
type DeleteVars = DeleteSessionMutationVariables;

interface PropTypes {
	session: Session;
	day: Day;
	onSessionUpdate: () => void;
}

export default SessionCard;
