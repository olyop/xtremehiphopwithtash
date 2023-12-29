import { FC, Fragment, createElement } from "react";

import SessionStartTime from "../../components/session-start-end-time";
import { Session } from "../../generated-types";

const SessionSubtitle: FC<Props> = ({ startTime, endTime, label }) => (
	<Fragment>
		<SessionStartTime startTime={startTime} endTime={endTime} />
		<Fragment> on </Fragment>
		{label}
	</Fragment>
);

interface Props extends Pick<Session, "startTime" | "endTime"> {
	label: string;
}

export default SessionSubtitle;
