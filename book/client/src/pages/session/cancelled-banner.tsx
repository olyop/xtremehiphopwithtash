import MinusCircleIcon from "@heroicons/react/24/solid/MinusCircleIcon";
import { FC, createElement } from "react";

const SessionCancelledBanner: FC = () => (
	<div className="flex items-center gap-2 bg-red-500 px-4 py-2 shadow-2xl">
		<MinusCircleIcon className="h-6 w-6 text-white" />
		<p className="pb-0.5 text-xl font-bold text-white">Cancelled</p>
	</div>
);

export default SessionCancelledBanner;
