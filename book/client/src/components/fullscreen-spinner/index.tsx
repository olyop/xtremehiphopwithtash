import { FC, createElement } from "react";

import Loading from "../loading";
import Modal from "../modal";

const FullscreenSpinner: FC<Props> = ({ isLoading, className, backgroundClassName }) => (
	<Modal
		hideTitle
		hideCloseButton
		isOpen={isLoading}
		className={className}
		backgroundClassName={`opacity-20 ${backgroundClassName ?? ""}`}
		modalClassName="!bg-transparent !shadow-none !top-1/2 !-translate-y-1/2"
		contentClassName="flex items-center justify-center"
		children={<Loading />}
	/>
);

interface Props {
	isLoading: boolean;
	className?: string;
	backgroundClassName?: string;
}

export default FullscreenSpinner;
