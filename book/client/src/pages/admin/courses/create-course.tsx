import { useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import CourseInput from "../../../components/entity-inputs/course-input";
import FormError from "../../../components/form-error";
import Modal from "../../../components/modal";
import {
	CourseInput as CourseInputType,
	Mutation,
	MutationCreateCourseArgs,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import CREATE_LOCATION from "./create-course.graphql";
import GET_LOCATIONS from "./get-courses.graphql";
import { initialInput } from "./initial-input";

const AddCourse: FC = () => {
	const [input, setInput] = useState<CourseInputType>(initialInput);

	const [createCourse, { data, loading, error }] = useMutation<Data, Vars>(CREATE_LOCATION);

	const handleSubmit = () => {
		if (!data) {
			void createCourse({
				refetchQueries: [GET_LOCATIONS],
				variables: {
					input: {
						name: input.name,
						description: input.description,
						photo: input.photo,
						defaultPrice: input.defaultPrice === 0 ? null : input.defaultPrice,
						defaultDuration: input.defaultDuration,
						defaultCapacity: input.defaultCapacity,
						defaultEquipmentAvailable: input.defaultEquipmentAvailable,
						defaultLocationID: input.defaultLocationID,
						defaultInstructorIDs: input.defaultInstructorIDs,
					},
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
				text="Add course"
				ariaLabel="Click to add a course"
				onClick={openModal}
				leftIcon={className => <PlusIcon className={className} />}
			/>
			<Modal
				title="Add course"
				icon={className => <PlusIcon className={className} />}
				isOpen={isOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				children={
					<Fragment>
						<CourseInput input={input} onChange={setInput} />
						<FormError error={error} />
					</Fragment>
				}
				buttons={
					<Button
						onClick={handleSubmit}
						className="self-start"
						leftIcon={className => <PlusIcon className={className} />}
						text={loading ? "Adding course..." : "Add course"}
						ariaLabel={loading ? "Adding course now" : "Click to add course"}
					/>
				}
			/>
		</Fragment>
	);
};

type Data = Pick<Mutation, "createCourse">;
type Vars = MutationCreateCourseArgs;

export default AddCourse;
