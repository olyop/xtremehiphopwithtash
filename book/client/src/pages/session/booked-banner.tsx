import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";
import { FC, createElement } from "react";

import { Session } from "../../generated-types";

const SessionBookedBanner: FC<Props> = ({ session }) => {
	if (!session.hasBooked) {
		return null;
	}

	return (
		<div className="flex items-center gap-2 px-4 py-2 bg-blue-500 shadow-2xl">
			<CalendarIcon className="w-6 h-6 text-white" />
			<p className="pb-0.5 text-xl font-bold text-white">Booked</p>
		</div>
	);
};

interface Props {
	session: Session;
}

export default SessionBookedBanner;
