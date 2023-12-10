import { useLazyQuery } from "@apollo/client";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect } from "react";

import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { Session, SessionViewsQuery, SessionViewsQueryVariables } from "../../../generated-types";
import { dateTimeFormatter, viewsFormatter } from "../../../helpers/intl";
import { determineDetailsFullName } from "../../../helpers/util";
import { useModal } from "../../../hooks";
import SESSION_VIEWS from "./session-views.graphql";

const ViewsSession: FC<PropTypes> = ({ session }) => {
	const [isModalOpen, openModal, closeModal] = useModal();

	const [getViews, { data, error }] = useLazyQuery<SessionViewsQuery, SessionViewsQueryVariables>(SESSION_VIEWS, {
		variables: { sessionID: session.sessionID },
	});

	useEffect(() => {
		if (isModalOpen) {
			void getViews();
		}
	}, [isModalOpen]);

	return (
		<Fragment>
			<button onClick={openModal} aria-label="See views" type="button" className="hover:underline">
				{session.viewsCount ? viewsFormatter.format(session.viewsCount) : 0}
			</button>
			<Modal
				title="Session Views"
				className="z-30"
				icon={className => <EyeIcon className={className} />}
				isOpen={isModalOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				error={error}
				children={
					data && (
						<div className="border">
							{data.getSessionByID.views ? (
								<Fragment>
									{data.getSessionByID.views.map(view => (
										<div key={view.student.studentID} className="p-2 border-b last:border-none flex justify-between">
											<div className="flex flex-row items-center gap-2">
												<CheckIcon className={`w-4 h-4 text-green-500 ${view.hasBooked ? "visible" : "invisible"}`} />
												<p>{determineDetailsFullName(view.student.details)}</p>
											</div>
											<p>{dateTimeFormatter.format(view.createdAt * 1000)}</p>
										</div>
									))}
								</Fragment>
							) : (
								<p className="p-2">No views yet</p>
							)}
						</div>
					)
				}
				buttons={
					<Button
						text="Close"
						onClick={closeModal}
						ariaLabel="Close session views modal"
						leftIcon={className => <XMarkIcon className={className} />}
					/>
				}
			/>
		</Fragment>
	);
};

interface PropTypes {
	session: Session;
}

export default ViewsSession;
