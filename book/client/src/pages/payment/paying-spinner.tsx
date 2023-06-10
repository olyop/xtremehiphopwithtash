import { FC, createElement } from "react";

import Loading from "../../components/loading";
import Modal from "../../components/modal";

const PayingSpinner: FC<PropTypes> = ({ isPaying }) => (
	<Modal
		hideTitle
		hideCloseButton
		isOpen={isPaying}
		backgroundClassName="opacity-20"
		modalClassName="!bg-transparent !shadow-none !top-1/2 !-translate-y-1/2"
		contentClassName="flex items-center justify-center"
		children={<Loading />}
	/>
);

interface PropTypes {
	isPaying: boolean;
}

export default PayingSpinner;
