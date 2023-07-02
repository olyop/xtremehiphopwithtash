import { useMutation } from "@apollo/client/react/hooks/useMutation";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { DeleteSessionMutation, DeleteSessionMutationVariables, Session } from "../../../generated-types";
import { useModal } from "../../../hooks";
import SessionSubtitle from "../session-subtitle";
import DELETE_SESSION from "./delete-session.graphql";

const DeleteSession: FC<PropTypes> = ({ session }) => {
	const navigate = useNavigate();
	const [isModalOpen, openModal, closeModal] = useModal();

	const [deleteSession, { data, loading, error }] = useMutation<Data, Vars>(DELETE_SESSION);

	const handleDelete = () => {
		void deleteSession({
			variables: {
				sessionID: session.sessionID,
			},
		});
	};

	useEffect(() => {
		if (data?.deleteSessionByID) {
			closeModal();
			navigate("/");
		}
	}, [data]);

	return (
		<Fragment>
			<Button
				transparent
				text="Delete"
				ariaLabel="Delete"
				onClick={openModal}
				className="!px-2 !gap-1"
				leftIcon={className => <TrashIcon className={className} />}
			/>
			<Modal
				title="Delete Session"
				className="z-30"
				isOpen={isModalOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				icon={className => <TrashIcon className={className} />}
				subTitle={<SessionSubtitle startTime={session.startTime} endTime={session.endTime} label="" />}
				children={<p>Are you sure?</p>}
				error={error}
				buttons={
					<Fragment>
						<Button
							onClick={handleDelete}
							text={loading ? "Deleting..." : "Yes"}
							ariaLabel={loading ? "Deleting..." : "Yes"}
							leftIcon={className => <CheckIcon className={className} />}
						/>
						<Button
							transparent
							text="No"
							ariaLabel="No"
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

type Data = DeleteSessionMutation;
type Vars = DeleteSessionMutationVariables;

export default DeleteSession;
