import ChevronDoubleRightIcon from "@heroicons/react/24/solid/ChevronDoubleRightIcon";
import { FC, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import { useHasMounted } from "../../../hooks";

const ToPaymentButton: FC<Props> = ({ onClick }) => {
	const hasMounted = useHasMounted();
	const [text, setText] = useState("Next");

	const handler = () => {
		if (window.innerWidth < 400) {
			setText("Next");
		} else {
			setText("To Payment");
		}
	};

	useEffect(() => {
		addEventListener("resize", handler);
		return () => {
			removeEventListener("resize", handler);
		};
	}, []);

	useEffect(() => {
		if (!hasMounted) {
			handler();
		}
	}, []);

	return (
		<Button
			ariaLabel="To Payment"
			text={text}
			onClick={onClick}
			rightIcon={className => <ChevronDoubleRightIcon className={className} />}
		/>
	);
};

interface Props {
	onClick: () => void;
}

export default ToPaymentButton;
