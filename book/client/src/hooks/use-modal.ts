import { useState } from "react";

export const useModal = (onClose?: () => void, defaultValue = false): UseModalReturn => {
	const [isOpen, setIsOpen] = useState(defaultValue);

	const handleModalOpen = () => {
		setIsOpen(true);
	};

	const handleModalClose = () => {
		if (onClose) {
			onClose();
		}

		setIsOpen(false);
	};

	return [isOpen, handleModalOpen, handleModalClose];
};

type UseModalReturn = [isOpen: boolean, openModal: () => void, closeModal: () => void];
