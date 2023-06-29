import { useMutation } from "@apollo/client/react/hooks/useMutation";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { CancelSessionMutation, CancelSessionMutationVariables, Session } from "../../../generated-types";
import { useModal } from "../../../hooks";
import SessionSubtitle from "../session-subtitle";
import CANCEL_SESSION from "./cancel-session.graphql";

const DeleteSession: FC<PropTypes> = ({ session }) => {
	const navigate = useNavigate();
	const [isModalOpen, openModal, closeModal] = useModal();

	const [deleteSession, { data, loading, error }] = useMutation<Data, Vars>(CANCEL_SESSION);

	const handleDelete = () => {
		void deleteSession({
			variables: {
				sessionID: session.sessionID,
			},
		});
	};

	useEffect(() => {
		if (data?.cancelSessionByID) {
			closeModal();
			navigate("/");
		}
	}, [data]);

	return (
		<Fragment>
			<Button
				transparent
				text="Cancel"
				ariaLabel="Cancel"
				onClick={openModal}
				leftIcon={className => <XCircleIcon className={className} />}
			/>
			<Modal
				title="Cancel Session"
				className="z-30"
				isOpen={isModalOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				icon={className => <XCircleIcon className={className} />}
				subTitle={<SessionSubtitle startTime={session.startTime} endTime={session.endTime} label="" />}
				children={<p>Are you sure?</p>}
				error={error}
				buttons={
					<Fragment>
						<Button
							onClick={handleDelete}
							text={loading ? "Cancelling..." : "Cancel"}
							ariaLabel={loading ? "Cancelling..." : "Cancel"}
							leftIcon={className => <XCircleIcon className={className} />}
						/>
						<Button
							transparent
							text="No"
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

interface PropTypes {
	session: Session;
}

type Data = CancelSessionMutation;
type Vars = CancelSessionMutationVariables;

export default DeleteSession;