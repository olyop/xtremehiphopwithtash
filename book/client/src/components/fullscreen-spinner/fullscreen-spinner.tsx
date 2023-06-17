import { FC, createElement } from "react";

import Loading from "../loading";
import Modal from "../modal";

const FullscreenSpinner: FC<PropTypes> = ({ isLoading, className }) => (
	<Modal
		hideTitle
		hideCloseButton
		isOpen={isLoading}
		className={className}
		backgroundClassName="opacity-20"
		modalClassName="!bg-transparent !shadow-none !top-1/2 !-translate-y-1/2"
		contentClassName="flex items-center justify-center"
		children={<Loading />}
	/>
);

interface PropTypes {
	isLoading: boolean;
	className?: string;
}

export default FullscreenSpinner;
