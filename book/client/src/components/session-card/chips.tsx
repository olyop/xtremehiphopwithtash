import { FC, Fragment, createElement, useContext } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import { Session } from "../../generated-types";
import { isInPast } from "../../helpers/date";
import { isSessionInProgress } from "../../helpers/util";
import { determinePlural } from "../../utils";
import SessionCardChip from "./chip";

const SessionCardChips: FC<Props> = ({ session }) => {
	const isAdministrator = useContext(IsAdministratorContext);

	return (
		<div className="absolute -top-[0.2rem] right-1.5 z-10 flex items-end gap-1">
			{session.isCancelled ? (
				<SessionCardChip text="Cancelled" colorClassName="bg-red-500" />
			) : (
				<Fragment>
					{isSessionInProgress(session) ? (
						<SessionCardChip text="In Progress" colorClassName="bg-black" />
					) : (
						<Fragment>
							{!isInPast(new Date(session.endTime)) && (
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
								</Fragment>
							)}
							{session.price === null && <SessionCardChip text="Free" colorClassName="bg-green-500" />}
						</Fragment>
					)}
					{session.hasBooked && <SessionCardChip text="Booked" colorClassName="bg-blue-500" />}
					{isAdministrator && session.viewsCount && (
						<SessionCardChip colorClassName="bg-gray-500 px-1.5" text={session.viewsCount.toString()} />
					)}
					{isAdministrator && session.capacityBooked && (
						<SessionCardChip colorClassName="bg-pink-500 px-1.5" text={session.capacityBooked.toString()} />
					)}
				</Fragment>
			)}
		</div>
	);
};

interface Props {
	session: Session;
}

export default SessionCardChips;
