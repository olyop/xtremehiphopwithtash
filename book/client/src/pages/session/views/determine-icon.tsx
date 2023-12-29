import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import MinusIcon from "@heroicons/react/24/solid/MinusIcon";
import { createElement } from "react";

import { SessionView } from "../../../generated-types";

const baseClassName = "w-4 h-4";

export const determineSessionViewIcon = ({ hasBooked, hasCancelled }: SessionView) => {
	if (hasCancelled) {
		return <MinusIcon className={`${baseClassName} text-red-500`} />;
	} else if (hasBooked) {
		return <CheckIcon className={`${baseClassName} text-green-500`} />;
	} else {
		return <EyeIcon className={`${baseClassName} text-gray-500`} />;
	}
};
