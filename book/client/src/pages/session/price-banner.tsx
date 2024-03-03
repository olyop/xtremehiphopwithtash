import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { FC, createElement } from "react";

import { Session } from "../../generated-types";
import { currencyDollarsFormatter } from "../../helpers/intl";
import { centsToDollars } from "../../utils";

const SessionPriceBanner: FC<Props> = ({ session }) => {
	const isFree = session.price === null;
	return (
		<div className={`flex items-center gap-2 px-4 py-2 ${isFree ? "bg-green-500" : "bg-gray-700"} shadow-2xl`}>
			{isFree ? (
				<CheckCircleIcon className="size-6 text-white" />
			) : (
				<InformationCircleIcon className="size-6 text-white" />
			)}
			<p className="pb-0.5 text-xl font-bold text-white">
				{isFree ? "Free session" : `Price: ${currencyDollarsFormatter.format(centsToDollars(session.price))}`}
			</p>
		</div>
	);
};

interface Props {
	session: Session;
}

export default SessionPriceBanner;
