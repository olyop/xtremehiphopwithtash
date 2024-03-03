import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement } from "react";

import { Course } from "../../generated-types";
import { useModal } from "../../hooks";
import Chip from "../chip";
import Modal from "../modal";

const CourseChip: FC<Props> = ({ course }) => {
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
							className="h-56 w-full select-none rounded-md object-cover object-top shadow-xl"
						/>
						<h1 className="text-center text-2xl">{course.name}</h1>
						<p className="text-center text-gray-500">{course.description}</p>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

interface Props {
	course: Course;
}

export default CourseChip;
