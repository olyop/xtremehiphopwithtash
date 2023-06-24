import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement } from "react";

import { Course } from "../../generated-types";
import { useModal } from "../../hooks";
import Chip from "../chip";
import Modal from "../modal";

const CourseChip: FC<PropTypes> = ({ course }) => {
	const [isOpen, openModal, closeModal] = useModal();
	return (
		<Fragment>
			<Chip
				onClick={openModal}
				chip={{
					chipID: course.courseID,
					text: course.name,
					photo: course.photo,
				}}
			/>
			<Modal
				isLarge
				hideTitle
				isOpen={isOpen}
				onClose={closeModal}
				title={course.name}
				contentClassName="flex flex-col justify-center gap-6 px-4 py-4"
				icon={iconClassName => <UserCircleIcon className={iconClassName} />}
				children={
					<Fragment>
						<img
							alt={course.name}
							src={course.photo}
							className="object-cover object-top w-full h-56 rounded-md shadow-xl select-none"
						/>
						<h1 className="text-2xl text-center">{course.name}</h1>
						<p className="text-gray-500 text-center">{course.description}</p>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

interface PropTypes {
	course: Course;
}

export default CourseChip;
