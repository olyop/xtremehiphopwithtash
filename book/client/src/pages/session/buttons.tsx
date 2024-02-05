import { FC, createElement } from "react";

import { Session } from "../../generated-types";
import BookSession from "./book-session";
import ShareButton from "./share-button";

const SessionButtons: FC<Props> = ({ session, isInPast }) => (
	<div className="flex gap-4 justify-start flex-col sm:flex-row">
		<BookSession session={session} isSessionInPast={isInPast} />
		{!session.isCancelled && !isInPast && <ShareButton text={location.href} />}
	</div>
);

interface Props {
	session: Session;
	isInPast: boolean;
}

export default SessionButtons;
