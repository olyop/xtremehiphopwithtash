import { useMutation } from "@apollo/client";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import SessionForm from "../../../components/forms/session-form";
import Modal from "../../../components/modal";
import {
	Session,
	SessionInput,
	UpdateSessionMutation,
	UpdateSessionMutationVariables,
} from "../../../generated-types";
import { determineSessionDateLabel } from "../../../helpers";
import { useModal } from "../../../hooks";
import { millisecondsToSeconds } from "../../../utils";
import GET_SESSION_PAGE from "../get-session-page.graphql";
import SessionSubtitle from "../session-subtitle";
import UPDATE_SESSION from "./update-session.graphql";

const UpdateSession: FC<PropTypes> = ({ session, onEdit }) => {
	const [isModalOpen, openModal, closeModal] = useModal();

	const [updateSession, { data, error, loading }] = useMutation<Data, Vars>(UPDATE_SESSION);

	const [updateInput, setUpdateInput] = useState<SessionInput>({
		title: session.title,
		notes: session.notes,
		price: session.price,
		equipmentFee: session.equipmentFee,
		startTime: session.startTime,
		endTime: session.endTime,
		capacityAvailable: session.capacityAvailable,
		equipmentAvailable: session.equipmentAvailable,
		courseID: session.course.courseID,
		instructorIDs: session.instructors.map(instructor => instructor.instructorID),
		locationID: session.location.locationID,
	});

	const handleUpdateSubmit = () => {
		void updateSession({
			refetchQueries: [GET_SESSION_PAGE],
			variables: {
				sessionID: session.sessionID,
				input: {
					...updateInput,
					startTime: millisecondsToSeconds(updateInput.startTime),
					endTime: millisecondsToSeconds(updateInput.endTime),
				},
			},
		});
	};

	useEffect(() => {
		if (data) {
			closeModal();
			onEdit();
		}
	}, [data]);

	return (
		<Fragment>
			<Button
				transparent
				text="Edit"
				ariaLabel="Edit session"
				onClick={openModal}
				leftIcon={className => <PencilIcon className={className} />}
			/>
			<Modal
				title="Edit Session"
				className="z-30"
				subTitle={
					<SessionSubtitle
						startTime={session.startTime}
						endTime={session.endTime}
						label={determineSessionDateLabel(session)}
					/>
				}
				icon={className => <PencilIcon className={className} />}
				isOpen={isModalOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				error={error}
				children={<SessionForm input={updateInput} onChange={setUpdateInput} />}
				buttons={
					<Fragment>
						<Button
							text={loading ? "Editing..." : "Edit"}
							onClick={handleUpdateSubmit}
							ariaLabel={loading ? "Edit session" : "Edit"}
							leftIcon={className => <PencilIcon className={className} />}
						/>
						<Button
							transparent
							text="Cancel"
							ariaLabel="Cancel"
							onClick={closeModal}
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

type Data = UpdateSessionMutation;
type Vars = UpdateSessionMutationVariables;

interface PropTypes {
	session: Session;
	onEdit: () => void;
}

export default UpdateSession;
