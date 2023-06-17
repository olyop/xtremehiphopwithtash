import { FC, Fragment, createElement } from "react";

import { Session } from "../../generated-types";
import { isSessionInProgress } from "../../helpers";
import { determinePlural } from "../../utils";
import SessionCardChip from "./chip";

const SessionCardChips: FC<PropTypes> = ({ session }) => (
	<div className="absolute flex items-end gap-1 right-1.5 -top-[0.2rem] z-10">
		{isSessionInProgress(session) ? (
			<SessionCardChip text="In Progress" colorClassName="bg-black" />
		) : (
			<Fragment>
				{session.capacityRemaining ? (
					<Fragment>
						{session.capacityRemaining <= 5 && (
							<SessionCardChip
								colorClassName="bg-amber-500"
								text={`${session.capacityRemaining} spot${determinePlural(session.capacityRemaining)} left`}
							/>
						)}
					</Fragment>
				) : (
					<SessionCardChip text="Fully Booked" colorClassName="bg-purple-500" />
				)}
				{session.price === null && <SessionCardChip text="Free" colorClassName="bg-green-500" />}
			</Fragment>
		)}
	</div>
);

interface PropTypes {
	session: Session;
}

export default SessionCardChips;
