import ChatBubbleOvalLeftIcon from "@heroicons/react/24/outline/ChatBubbleOvalLeftIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement } from "react";

import { Instructor } from "../../generated-types";
import { useModal } from "../../hooks";
import Button from "../button";
import Chip from "../chip";
import CopyButton from "../copy-button";
import Modal from "../modal";

const InstructorChip: FC<Props> = ({ instructor, showFullName }) => {
	const [isOpen, openModal, closeModal] = useModal();
	return (
		<Fragment>
			<Chip
				key={instructor.instructorID}
				onClick={openModal}
				chip={{
					chipID: instructor.instructorID,
					text:
						showFullName || !instructor.details.nickName
							? `${instructor.details.firstName} ${instructor.details.lastName}`
							: instructor.details.nickName,
					photo: instructor.photo,
				}}
			/>
			<Modal
				isLarge
				hideTitle
				isOpen={isOpen}
				onClose={closeModal}
				icon={iconClassName => <UserCircleIcon className={iconClassName} />}
				title={instructor.details.nickName ?? instructor.details.firstName}
				contentClassName="flex flex-col items-center justify-center gap-6 py-6"
				children={
					<Fragment>
						<img
							alt="Instructor"
							src={instructor.photo}
							className="h-48 w-48 select-none rounded-full object-cover shadow-xl"
						/>
						<div className="flex flex-col items-center gap-6">
							<div className="flex flex-col items-center gap-1">
								<h2 className="text-2xl">
									{instructor.details.firstName}
									<Fragment> </Fragment>
									{instructor.details.lastName}
								</h2>
								<h3 className="text-lg text-gray-500">({instructor.details.nickName})</h3>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-gray-500">Contact Number</p>
								<div className="ml-7 flex items-center gap-2">
									<p>{instructor.details.mobilePhoneNumber}</p>
									<CopyButton ariaLabel="Copy Mobile Number" text={instructor.details.mobilePhoneNumber} />
								</div>
							</div>
							<div className="flex flex-col items-center gap-2">
								<a href="https://ig.me/m/xtremehiphopwithtash" target="_blank" rel="noreferrer">
									<Button
										text="Instagram"
										ariaLabel="Instagram"
										leftIcon={className => <ChatBubbleOvalLeftIcon className={className} />}
									/>
								</a>
								<a href="https://m.me/100071620803738" target="_blank" rel="noreferrer">
									<Button
										text="Facebook"
										ariaLabel="Facebook"
										leftIcon={className => <ChatBubbleOvalLeftIcon className={className} />}
									/>
								</a>
							</div>
						</div>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

interface Props {
	instructor: Instructor;
	showFullName: boolean;
}

export default InstructorChip;
