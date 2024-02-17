import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useAuth0 } from "@auth0/auth0-react";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import DetailsForm from "../../../components/forms/details-form";
import Modal from "../../../components/modal";
import { Details, DetailsInput, UpdateStudentMutation, UpdateStudentMutationVariables } from "../../../generated-types";
import { useModal } from "../../../hooks";
import { detailsToInput } from "./details-to-input";
import UPDATE_STUDENT from "./update-student.graphql";

const AccountUpdate: FC<Props> = ({ details, onUpdate }) => {
	const { user, logout } = useAuth0();

	const [isEditModalOpen, openEditModal, closeEditModal] = useModal();

	const [hasUpdatedEmailAddress, setHasUpdatedEmailAddress] = useState(false);
	const [detailsInput, setDetailsInput] = useState<DetailsInput | null>(detailsToInput(details));

	const [updateStudent, updateStudentResult] = useMutation<UpdateStudentMutation, UpdateStudentMutationVariables>(
		UPDATE_STUDENT,
	);

	const handleUpdateStudent = () => {
		if (user?.sub && detailsInput && !updateStudentResult.loading) {
			if (detailsInput.emailAddress !== user.email) {
				setHasUpdatedEmailAddress(true);
			}

			void updateStudent({
				variables: {
					detailsInput,
				},
			});
		}
	};

	useEffect(() => {
		if (updateStudentResult.data) {
			closeEditModal();

			if (hasUpdatedEmailAddress) {
				void logout({
					logoutParams: {
						returnTo: window.location.origin,
					},
				});
			} else {
				onUpdate();
			}
		}
	}, [updateStudentResult.data]);

	return (
		<Fragment>
			<Button
				text="Edit"
				ariaLabel="Edit"
				onClick={openEditModal}
				leftIcon={className => <PencilIcon className={className} />}
			/>
			{detailsInput && (
				<Modal
					title="Edit Details"
					isOpen={isEditModalOpen}
					onClose={closeEditModal}
					contentClassName="flex flex-col gap-4"
					icon={className => <PencilIcon className={className} />}
					children={<DetailsForm input={detailsInput} onChange={setDetailsInput} />}
					error={updateStudentResult.error}
					buttons={
						<Fragment>
							<Button
								isSubmit
								ariaLabel="Save"
								text={updateStudentResult.loading ? "Saving..." : "Save"}
								onClick={handleUpdateStudent}
								disabled={updateStudentResult.loading}
								leftIcon={className => <CheckIcon className={className} />}
							/>
							<Button
								ariaLabel="Cancel"
								text="Cancel"
								transparent
								onClick={closeEditModal}
								leftIcon={className => <XMarkIcon className={className} />}
							/>
						</Fragment>
					}
				/>
			)}
		</Fragment>
	);
};

interface Props {
	details: Details;
	onUpdate: () => void;
}

export default AccountUpdate;
