import { FC, createElement } from "react";

import { Session } from "../../generated-types";
import { Breakpoint, useBreakpoint } from "../../hooks";
import BookSession from "./book-session";
import ShareButton from "./share-button";

const SessionButtons: FC<Props> = ({ session, isInPast }) => {
	const breakpoint = useBreakpoint();
	return (
		<div className={`flex gap-4 justify-start ${breakpoint === Breakpoint.TINY ? "flex-col" : "flex-row"}`}>
			<BookSession session={session} isSessionInPast={isInPast} />
			{!session.isCancelled && <ShareButton url={location.href} isSessionInPast={isInPast} />}
		</div>
	);
};

interface Props {
	session: Session;
	isInPast: boolean;
}

export default SessionButtons;
