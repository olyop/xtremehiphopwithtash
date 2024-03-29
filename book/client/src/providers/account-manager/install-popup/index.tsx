import { useMutation } from "@apollo/client/react/hooks/useMutation";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, PropsWithChildren, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { ViewInstallPopupMutation } from "../../../generated-types";
import { useModal } from "../../../hooks";
import InstallPWA from "../../../layouts/install-pwa";
import VIEW_INSTALL_POPUP from "./view-install-popup.graphql";

const InstallPopup: FC<PropsWithChildren<Props>> = ({ shouldShowInstallPopup, children }) => {
	const [canClose, setCanClose] = useState(false);
	const [isModalOpen, openModal, closeModal] = useModal();

	const [viewInstallPopup, { data, loading }] = useMutation<ViewInstallPopupMutation>(VIEW_INSTALL_POPUP);

	const handleCloseModal = () => {
		void viewInstallPopup();
	};

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		if (shouldShowInstallPopup) {
			timeout = setTimeout(() => {
				openModal();
			}, 5000);
		}

		return () => {
			if (shouldShowInstallPopup) {
				clearTimeout(timeout);
			}
		};
	}, []);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		if (isModalOpen) {
			timeout = setTimeout(() => {
				setCanClose(true);
			}, 3000);
		}

		return () => {
			if (isModalOpen) {
				clearTimeout(timeout);
			}
		};
	}, [isModalOpen]);

	useEffect(() => {
		if (data?.viewInstallPopup) {
			closeModal();
		}
	}, [data]);

	return (
		<Fragment>
			{children}
			<Modal
				disableCloseOnEscape
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				contentClassName="!py-12 h-full"
				modalClassName="sm:!w-[38rem] !h-[calc(100vh_-_6rem)] !top-1/2 -translate-y-1/2 !rounded-3xl"
				children={
					<InstallPWA
						renderCloseButton={() => (
							<Button
								disabled={!canClose}
								onClick={handleCloseModal}
								ariaLabel="Never show this again"
								leftIcon={() => <XMarkIcon className="h-6 w-6" />}
								className="!h-auto gap-4 rounded-xl border px-6 py-3"
								text={loading ? "Confirming..." : canClose ? "Never show this again" : "Please wait..."}
							/>
						)}
					/>
				}
			/>
		</Fragment>
	);
};

interface Props {
	shouldShowInstallPopup: boolean;
}

export default InstallPopup;
