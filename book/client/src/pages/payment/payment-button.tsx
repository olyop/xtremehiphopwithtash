import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";

const PaymentButton: FC<Props> = ({ text, disabled, onClick }) => (
	<Button
		text={text}
		ariaLabel={text}
		textClassName="!text-xl"
		onClick={onClick}
		disabled={disabled}
		className="!h-14 shadow-xl hover:shadow-xl rounded-xl"
		leftIcon={className => <CalendarIcon className={`${className} h-7 w-7`} />}
	/>
);

interface Props {
	text: string;
	disabled: boolean;
	onClick: () => void;
}

export default PaymentButton;
