import { useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import InstructorForm from "../../../components/forms/instructor-form";
import Modal from "../../../components/modal";
import {
	CreateInstructorMutation,
	InstructorInput,
	MutationCreateInstructorArgs,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import CREATE_INSTRUCTOR from "./create-instructor.graphql";
import GET_INSTRUCTORS from "./get-instructors.graphql";
import { initialInput } from "./initial-input";

const AddInstructor: FC = () => {
	const [input, setInput] = useState<InstructorInput>(initialInput);

	const [createInstructor, { data, loading, error }] = useMutation<Data, Vars>(CREATE_INSTRUCTOR);

	const handleFormReset = () => {
		setInput(initialInput);
	};

	const [isOpen, openModal, closeModal] = useModal(handleFormReset);

	const handleSubmit = () => {
		if (!data) {
			void createInstructor({
				refetchQueries: [GET_INSTRUCTORS],
				variables: {
					input,
				},
			});
		}
	};

	useEffect(() => {
		if (data) {
			closeModal();
		}
	}, [data]);

	return (
		<Fragment>
			<Button
				text="Add Instructor"
				ariaLabel="Click to add a Instructor"
				onClick={openModal}
				leftIcon={className => <PlusIcon className={className} />}
			/>
			<Modal
				title="Add Instructor"
				icon={className => <PlusIcon className={className} />}
				isOpen={isOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				children={<InstructorForm input={input} onChange={setInput} />}
				error={error}
				buttons={
					<Fragment>
						<Button
							onClick={handleSubmit}
							className="self-start"
							leftIcon={className => <PlusIcon className={className} />}
							text={loading ? "Adding Instructor..." : "Add Instructor"}
							ariaLabel={loading ? "Adding Instructor..." : "Click to add Instructor"}
						/>
						<Button
							transparent
							text="Close"
							ariaLabel="Close Add Instructor"
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

type Data = CreateInstructorMutation;
type Vars = MutationCreateInstructorArgs;

export default AddInstructor;
