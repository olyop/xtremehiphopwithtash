import { MutationResult } from "@apollo/client/react/types/types";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TrashSolidIcon from "@heroicons/react/24/solid/TrashIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, ReactNode, createElement } from "react";

import Button from "../../../components/button";
import Entity, { EntityPropTypes } from "../../../components/entity";
import Modal from "../../../components/modal";
import { useModal } from "../../../hooks";

const AdminEntity: FC<PropTypes> = ({
	id,
	photo,
	text,
	description,
	typeName,
	isUpdating,
	isDeleting,
	onEdit,
	onDelete,
	editModalContent,
	editModalError,
	deleteModalError,
	isLargeEditModal = false,
}) => {
	const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
	const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();

	const handleOnEdit = () => {
		if (onEdit) {
			void onEdit(closeEditModal);
		}
	};

	const handleOnDelete = () => {
		if (onDelete) {
			void onDelete(closeDeleteModal);
		}
	};

	return (
		<Entity
			id={id}
			text={text}
			photo={photo}
			description={description}
			rightContent={
				<Fragment>
					{onEdit && (
						<Fragment>
							<Button
								transparent
								ariaLabel={`Edit ${typeName}`}
								onClick={openEditModal}
								leftIcon={className =>
									isUpdating ? <ArrowPathIcon className={className} /> : <PencilIcon className={className} />
								}
							/>
							<Modal
								title={`Edit ${typeName}`}
								subTitle={text}
								isLarge={isLargeEditModal}
								icon={className => <PencilIcon className={className} />}
								isOpen={isEditModalOpen}
								onClose={closeEditModal}
								contentClassName="flex flex-col gap-4"
								children={editModalContent}
								error={editModalError}
								buttons={
									<Fragment>
										<Button
											text="Edit"
											onClick={handleOnEdit}
											ariaLabel={`Edit ${typeName}`}
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
						</Fragment>
					)}
					{onDelete && (
						<Fragment>
							<Button
								transparent
								ariaLabel={`Delete ${typeName}`}
								onClick={openDeleteModal}
								leftIcon={className =>
									isDeleting ? <ArrowPathIcon className={className} /> : <TrashIcon className={className} />
								}
							/>
							<Modal
								title={`Delete ${typeName}`}
								subTitle={text}
								icon={className => <TrashIcon className={className} />}
								isOpen={isDeleteModalOpen}
								onClose={closeDeleteModal}
								contentClassName="flex flex-col gap-2 text"
								children={<p>Are you sure?</p>}
								error={deleteModalError}
								buttons={
									<Fragment>
										<Button
											text="Delete"
											ariaLabel="Delete"
											onClick={handleOnDelete}
											leftIcon={className => <TrashSolidIcon className={className} />}
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
				</Fragment>
			}
		/>
	);
};

export type OnEditAndUpdate = (closeModal: () => void) => Promise<void>;

interface PropTypes extends EntityPropTypes {
	typeName: string;
	isLargeEditModal?: boolean;
	isUpdating?: boolean;
	isDeleting?: boolean;
	onEdit?: OnEditAndUpdate;
	onDelete?: OnEditAndUpdate;
	editModalContent?: ReactNode;
	editModalError?: MutationResult["error"] | undefined;
	deleteModalError?: MutationResult["error"] | undefined;
}

export default AdminEntity;
