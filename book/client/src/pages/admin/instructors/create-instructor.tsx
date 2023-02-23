import { useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import FormError from "../../../components/form-error";
import Modal from "../../../components/modal";
import {
	InstructorInput as InstructorInputType,
	Mutation,
	MutationCreateInstructorArgs,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import CREATE_INSTRUCTOR from "./create-instructor.graphql";
import GET_INSTRUCTORS from "./get-instructors.graphql";
import { initialInput } from "./initial-input";
import InstructorInput from "./instructor-input";

const AddInstructor: FC = () => {
	const [input, setInput] = useState<InstructorInputType>(initialInput);

	const [createInstructor, { data, loading, error }] = useMutation<Data, Vars>(CREATE_INSTRUCTOR);

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
				children={
					<Fragment>
						<InstructorInput input={input} onChange={setInput} />
						<FormError error={error} />
					</Fragment>
				}
				buttons={
					<Fragment>
						<Button
							onClick={handleSubmit}
							className="self-start"
							leftIcon={className => <PlusIcon className={className} />}
							text={loading ? "Adding Instructor..." : "Add Instructor"}
							ariaLabel={loading ? "Adding Instructor..." : "Click to add Instructor"}
						/>
						{loading || (
							<Button
								transparent
								text="Close"
								ariaLabel="Close Add Instructor"
								onClick={closeModal}
								leftIcon={className => <XMarkIcon className={className} />}
							/>
						)}
					</Fragment>
				}
			/>
		</Fragment>
	);
};

type Data = Pick<Mutation, "createInstructor">;
type Vars = MutationCreateInstructorArgs;

export default AddInstructor;
