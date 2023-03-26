import { FC, Fragment, createElement } from "react";

import { Session } from "../../generated-types";
import { secondsToMilliseconds } from "../../utils";
import { timeFormatter } from "../schedule/helpers";

const SessionStartTime: FC<Pick<Session, "startTime" | "endTime">> = ({ startTime, endTime }) => (
	<Fragment>
		{timeFormatter.format(secondsToMilliseconds(startTime))}
		<Fragment> </Fragment>
		<span className="text-gray-500">to</span>
		<Fragment> </Fragment>
		{timeFormatter.format(secondsToMilliseconds(endTime))}
	</Fragment>
);

export default SessionStartTime;
