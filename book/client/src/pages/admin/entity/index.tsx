import { MutationResult } from "@apollo/client/react/types/types";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TrashSolidIcon from "@heroicons/react/24/solid/TrashIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, ReactNode, createElement } from "react";

import Button from "../../../components/button";
import Entity, { EntityProps } from "../../../components/entity";
import Modal from "../../../components/modal";
import { useModal } from "../../../hooks";

const AdminEntity: FC<Props> = ({
	id,
	photo,
	text,
	description,
	typeName,
	isUpdating,
	isDeleting,
	onEdit,
	onDelete,
	viewModalContent,
	editModalContent,
	editModalError,
	deleteModalError,
	isLargeEditModal = false,
}) => {
	const [isViewModalOpen, openViewModal, closeViewModal] = useModal();
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
					{viewModalContent && (
						<Fragment>
							<Button
								transparent
								text="View"
								onClick={openViewModal}
								textClassName="text-xs"
								ariaLabel={`View ${typeName}`}
								leftIcon={() => <EyeIcon className="!w-4 !h-4" />}
							/>
							<Modal
								isLarge
								subTitle={text}
								title={`View ${typeName}`}
								icon={className => <EyeIcon className={className} />}
								isOpen={isViewModalOpen}
								onClose={closeViewModal}
								contentClassName="flex flex-col gap-4"
								children={viewModalContent}
								buttons={
									<Button
										text="Close"
										ariaLabel="Close"
										onClick={closeViewModal}
										leftIcon={className => <XMarkIcon className={className} />}
									/>
								}
							/>
						</Fragment>
					)}
					{onEdit && (
						<Fragment>
							<Button
								transparent
								onClick={openEditModal}
								ariaLabel={`Edit ${typeName}`}
								leftIcon={className =>
									isUpdating ? <ArrowPathIcon className={className} /> : <PencilIcon className={className} />
								}
							/>
							<Modal
								subTitle={text}
								error={editModalError}
								isOpen={isEditModalOpen}
								onClose={closeEditModal}
								isLarge={isLargeEditModal}
								title={`Edit ${typeName}`}
								children={editModalContent}
								contentClassName="flex flex-col gap-4"
								icon={className => <PencilIcon className={className} />}
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
								onClick={openDeleteModal}
								ariaLabel={`Delete ${typeName}`}
								leftIcon={className =>
									isDeleting ? <ArrowPathIcon className={className} /> : <TrashIcon className={className} />
								}
							/>
							<Modal
								subTitle={text}
								error={deleteModalError}
								isOpen={isDeleteModalOpen}
								onClose={closeDeleteModal}
								title={`Delete ${typeName}`}
								children={<p>Are you sure?</p>}
								contentClassName="flex flex-col gap-2 text"
								icon={className => <TrashIcon className={className} />}
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

export type OnAction = (closeModal: () => void) => Promise<void>;

interface Props extends EntityProps {
	typeName: string;
	isLargeEditModal?: boolean;
	isUpdating?: boolean;
	isDeleting?: boolean;
	onEdit?: OnAction;
	onDelete?: OnAction;
	viewModalContent?: ReactNode;
	editModalContent?: ReactNode;
	editModalError?: MutationResult["error"] | undefined;
	deleteModalError?: MutationResult["error"] | undefined;
}

export default AdminEntity;
