import ChatBubbleOvalLeftIcon from "@heroicons/react/24/outline/ChatBubbleOvalLeftIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement } from "react";

import { Instructor } from "../../generated-types";
import { useModal } from "../../hooks";
import Button from "../button";
import Chip from "../chip";
import CopyButton from "../copy-button";
import Modal from "../modal";

const InstructorChip: FC<PropTypes> = ({ instructor }) => {
	const [isOpen, openModal, closeModal] = useModal();
	return (
		<Fragment>
			<Chip
				key={instructor.instructorID}
				onClick={openModal}
				chip={{
					chipID: instructor.instructorID,
					text: instructor.details.nickName ?? instructor.details.firstName,
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
							className="object-cover w-48 h-48 rounded-full shadow-xl select-none"
						/>
						<div className="flex flex-col items-center gap-6">
							<div className="flex flex-col gap-1 items-center">
								<h2 className="text-2xl">
									{instructor.details.firstName}
									<Fragment> </Fragment>
									{instructor.details.lastName}
								</h2>
								<h3 className="text-gray-500 text-lg">({instructor.details.nickName})</h3>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-gray-500">Contact Number</p>
								<div className="flex gap-2 items-center ml-7">
									<p>{instructor.details.mobilePhoneNumber}</p>
									<CopyButton ariaLabel="Copy Mobile Number" text={instructor.details.mobilePhoneNumber} />
								</div>
							</div>
							<div className="flex gap-2 flex-col items-center">
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

interface PropTypes {
	instructor: Instructor;
}

export default InstructorChip;
