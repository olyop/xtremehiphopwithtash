import { useMutation } from "@apollo/client/react/hooks/useMutation";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import CourseForm from "../../../components/forms/course-form";
import Modal from "../../../components/modal";
import { CourseInput, CreateCourseMutation, MutationCreateCourseArgs } from "../../../generated-types";
import { useModal } from "../../../hooks";
import CREATE_LOCATION from "./create-course.graphql";
import GET_COURSES from "./get-courses.graphql";
import { initialInput } from "./initial-input";

const AddCourse: FC = () => {
	const [input, setInput] = useState<CourseInput>(initialInput);

	const [createCourse, { data, loading, error }] = useMutation<Data, Vars>(CREATE_LOCATION);

	const handleSubmit = () => {
		if (!data) {
			void createCourse({
				refetchQueries: [GET_COURSES],
				variables: {
					input,
				},
			});
		}
	};

	const handleFormReset = () => {
		setInput(initialInput);
	};

	const [isOpen, openModal, closeModal] = useModal(handleFormReset);

	useEffect(() => {
		if (data) {
			closeModal();
		}
	}, [data]);

	return (
		<Fragment>
			<Button
				text="Add Session"
				ariaLabel="Click to add a session"
				onClick={openModal}
				leftIcon={className => <PlusIcon className={className} />}
			/>
			<Modal
				isLarge
				title="Add session"
				icon={className => <PlusIcon className={className} />}
				isOpen={isOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				children={<CourseForm input={input} onChange={setInput} />}
				error={error}
				buttons={
					<Fragment>
						<Button
							onClick={handleSubmit}
							className="self-start"
							leftIcon={className => <PlusIcon className={className} />}
							text={loading ? "Adding session..." : "Add session"}
							ariaLabel={loading ? "Adding session now" : "Click to add session"}
						/>
						<Button
							transparent
							text="Close"
							ariaLabel="Close"
							onClick={closeModal}
							disabled={loading}
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

type Data = CreateCourseMutation;
type Vars = MutationCreateCourseArgs;

export default AddCourse;
