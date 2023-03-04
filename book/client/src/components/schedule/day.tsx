import { FC, Fragment, createElement } from "react";

import { useModal } from "../../hooks";
import CreateSession from "./create-session";
import { Day as DayType } from "./types";

const Day: FC<PropTypes> = ({ day }) => {
	const [createSessionModal, openCreateSessionModal, closeCreateSessionModal] = useModal();
	return (
		<Fragment>
			<div
				aria-hidden="true"
				data-unix={day.unix}
				onClick={openCreateSessionModal}
				className={`bg-white p-1 cursor-pointer transition-colors hover:bg-gray-100 ${
					day.isToday ? "!bg-gray-200 hover:!bg-gray-300" : ""
				}`}
			>
				<p className="text-sm text-center select-none">{day.label}</p>
				{day.sessions && day.sessions.length > 0 && (
					<div className="flex flex-col gap-1">
						{day.sessions.map(session => (
							<div
								key={session.sessionID}
								className="flex items-center justify-between p-1 bg-gray-100 rounded"
							>
								<p className="text-sm">{session.title}</p>
							</div>
						))}
					</div>
				)}
			</div>
			<CreateSession day={day} isOpen={createSessionModal} onClose={closeCreateSessionModal} />
		</Fragment>
	);
};

interface PropTypes {
	day: DayType;
}

export default Day;
