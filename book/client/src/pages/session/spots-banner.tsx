import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { FC, Fragment, createElement } from "react";

import { Session } from "../../generated-types";
import { determinePlural } from "../../utils";

const SessionSpotsBanner: FC<PropTypes> = ({ session }) => {
	if (session.capacityRemaining && session.capacityRemaining > 5) return null;

	return (
		<div className="flex items-center gap-2 px-4 py-2 bg-gray-700">
			<InformationCircleIcon className="w-6 h-6 text-white" />
			<p className="pb-0.5 text-xl font-bold text-white">
				{session.capacityRemaining ? (
					<Fragment>
						{session.capacityRemaining <= 5 &&
							`${session.capacityRemaining} spot${determinePlural(session.capacityRemaining)} left`}
					</Fragment>
				) : (
					"Fully Booked"
				)}
			</p>
		</div>
	);
};

interface PropTypes {
	session: Session;
}

export default SessionSpotsBanner;
