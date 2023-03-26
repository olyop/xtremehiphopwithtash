import { MutationResult } from "@apollo/client";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, ReactNode, createElement } from "react";

import { useModal } from "../../hooks";
import Button from "../button";
import FormError from "../form-error";
import Modal from "../modal";

const Entity: FC<EntityPropTypes> = ({
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
		<div
			data-id={id}
			className="flex items-center justify-between h-full p-2 border-b last:border-b-0"
		>
			<div className="flex items-center gap-2">
				{photo && (
					<img
						alt={text?.toString()}
						src={photo}
						className="w-8 h-8 rounded-full shadow-md select-none"
					/>
				)}
				<div>
					<p className="text-base">{text}</p>
					<p className="text-xs">{description}</p>
				</div>
			</div>
			<div className="flex items-center">
				{onEdit && (
					<Fragment>
						<Button
							text="Edit"
							transparent
							ariaLabel={`Edit ${typeName}`}
							onClick={openEditModal}
							leftIcon={className =>
								isUpdating ? (
									<ArrowPathIcon className={className} />
								) : (
									<PencilIcon className={className} />
								)
							}
						/>
						<Modal
							title={`Edit ${typeName}`}
							subTitle={text}
							icon={className => <PencilIcon className={className} />}
							isOpen={isEditModalOpen}
							onClose={closeEditModal}
							contentClassName="flex flex-col gap-4"
							children={
								<Fragment>
									{editModalContent}
									<FormError error={editModalError} />
								</Fragment>
							}
							buttons={
								<Fragment>
									<Button
										text="Edit"
										onClick={handleOnEdit}
										ariaLabel={`Edit ${typeName}`}
										leftIcon={className => <PencilIcon className={className} />}
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
							ariaLabel="Delete"
							onClick={openDeleteModal}
							leftIcon={className =>
								isDeleting ? (
									<ArrowPathIcon className={className} />
								) : (
									<XCircleIcon className={className} />
								)
							}
						/>
						<Modal
							title={`Delete ${typeName}`}
							icon={className => <TrashIcon className={className} />}
							isOpen={isDeleteModalOpen}
							onClose={closeDeleteModal}
							contentClassName="flex flex-col gap-2 text"
							children={
								<Fragment>
									<p>Are you sure?</p>
									<FormError error={deleteModalError} />
								</Fragment>
							}
							buttons={
								<Fragment>
									<Button
										text="Delete"
										ariaLabel="Delete"
										onClick={handleOnDelete}
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
	);
};

export type OnEditAndUpdate = (closeModal: () => void) => Promise<void>;

interface EntityPropTypes {
	id: string;
	photo?: string;
	text: ReactNode;
	description: ReactNode;
	typeName: string;
	isUpdating?: boolean;
	isDeleting?: boolean;
	onEdit?: OnEditAndUpdate;
	onDelete?: OnEditAndUpdate;
	editModalContent?: ReactNode;
	editModalError?: MutationResult["error"] | undefined;
	deleteModalError?: MutationResult["error"] | undefined;
}

export default Entity;
