import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon";
import { FC, createElement } from "react";

import { Session } from "../../generated-types";
import { determinePlural } from "../../utils";

const SessionCapacityBanner: FC<Props> = ({ session }) => {
	if (session.capacityRemaining && session.capacityRemaining > 5) {
		return null;
	}

	return (
		<div className="flex items-center gap-2 bg-amber-500 px-4 py-2 shadow-2xl">
			<ExclamationTriangleIcon className="h-6 w-6 text-white" />
			<p className="pb-0.5 text-xl font-bold text-white">
				{session.capacityRemaining
					? `${session.capacityRemaining} spot${determinePlural(session.capacityRemaining)} left`
					: "Fully Booked"}
			</p>
		</div>
	);
};

interface Props {
	session: Session;
}

export default SessionCapacityBanner;
