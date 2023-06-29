import MinusCircleIcon from "@heroicons/react/24/solid/MinusCircleIcon";
import { FC, createElement, useContext } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import { Session } from "../../generated-types";

const SessionCancelledBanner: FC<PropTypes> = ({ session }) => {
	const { isAdministrator } = useContext(IsAdministratorContext);

	if (!isAdministrator || !session.isCancelled) {
		return null;
	}

	return (
		<div className="flex items-center gap-2 px-4 py-2 bg-red-500 shadow-2xl">
			<MinusCircleIcon className="w-6 h-6 text-white" />
			<p className="pb-0.5 text-xl font-bold text-white">Cancelled</p>
		</div>
	);
};

interface PropTypes {
	session: Session;
}

export default SessionCancelledBanner;
