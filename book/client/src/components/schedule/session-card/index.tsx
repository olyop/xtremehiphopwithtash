import { useMutation } from "@apollo/client";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { FC, Fragment, ReactNode, createElement, useState } from "react";

import {
	DeleteSessionMutationVariables,
	Session,
	SessionInput as SessionInputType,
	UpdateSessionMutation,
	UpdateSessionMutationVariables,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import { secondsToMilliseconds } from "../../../utils";
import Button from "../../button";
import FormError from "../../form-error";
import Modal from "../../modal";
import { timeFormatter } from "../helpers";
import SessionInput from "../session-input";
import { Day } from "../types";
import "./index.scss";
import { sessionToInput } from "./session-to-input";
import UPDATE_SESSION from "./update-session.graphql";

const SessionCard: FC<PropTypes> = ({ session, day }) => {
	const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
	const [input, setInput] = useState<SessionInputType>(sessionToInput(session));

	const [updateSession, { error }] = useMutation<Data, Vars>(UPDATE_SESSION);
	const [deleteSession] = useMutation<unknown, DeleteSessionMutationVariables>(UPDATE_SESSION);

	const handleSubmit = () => {
		void updateSession({
			variables: {
				input,
				sessionID: session.sessionID,
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

	return (
		<Fragment>
			<div
				data-id={session.sessionID}
				className="relative flex flex-col justify-between p-1 transition-all bg-white border border-gray-300 rounded-lg SessionCard"
			>
				<div className="absolute inset-0 z-10 invisible transition-opacity bg-gray-400 rounded-lg opacity-0 SessionCard__blur" />
				<div className="absolute inset-0 z-20 flex items-center justify-center invisible gap-2 transition-opacity opacity-0 SessionCard__buttons">
					<Button
						text="Edit"
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
						onClick={handleDelete}
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
						<FormError error={error} />
					</Fragment>
				}
				buttons={
					<Button
						text="Submit"
						ariaLabel="Submit"
						onClick={handleSubmit}
						leftIcon={className => <PencilIcon className={className} />}
					/>
				}
			/>
		</Fragment>
	);
};

type Data = UpdateSessionMutation;
type Vars = UpdateSessionMutationVariables;

interface PropTypes {
	session: Session;
	day: Day;
}

export default SessionCard;
