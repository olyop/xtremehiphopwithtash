import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement } from "react";

import { Instructor } from "../../generated-types";
import { useModal } from "../../hooks";
import { capitalizeFirstLetter } from "../../utils";
import Chip from "../chip";
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
				icon={iconClassName => <UserCircleIcon className={iconClassName} />}
				title={instructor.details.nickName ?? instructor.details.firstName}
				onClose={closeModal}
				contentClassName="flex flex-col items-center justify-center gap-6 h-[28rem]"
				children={
					<Fragment>
						<img
							alt="Instructor"
							src={instructor.photo}
							className="object-cover w-48 h-48 rounded-full shadow-xl select-none"
						/>
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-2xl">
								{instructor.details.firstName}
								<Fragment> </Fragment>
								{instructor.details.lastName}
								{instructor.details.nickName && (
									<Fragment>
										<Fragment> </Fragment>
										<span className="text-gray-500">({instructor.details.nickName})</span>
									</Fragment>
								)}
							</h2>
							{instructor.details.gender && (
								<p>{capitalizeFirstLetter(instructor.details.gender.toLowerCase())}</p>
							)}
							<div className="flex flex-col items-center">
								<p className="text-gray-500">Contact Number</p>
								<p>{instructor.details.mobilePhoneNumber}</p>
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
