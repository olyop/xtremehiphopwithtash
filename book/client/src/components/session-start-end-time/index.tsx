import { FC, Fragment, createElement } from "react";

import { Session } from "../../generated-types";
import { timeFormatter } from "../../intl";

const SessionStartTime: FC<Pick<Session, "startTime" | "endTime">> = ({ startTime, endTime }) => (
	<Fragment>
		{timeFormatter.format(startTime)}
		<Fragment> </Fragment>
		<span className="text-gray-500">to</span>
		<Fragment> </Fragment>
		{timeFormatter.format(endTime)}
	</Fragment>
);

export default SessionStartTime;
