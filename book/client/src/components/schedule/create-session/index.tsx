import { useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import {
	CreateSessionMutation,
	CreateSessionMutationVariables,
	SessionInput as SessionInputType,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import { millisecondsToSeconds } from "../../../utils";
import Button from "../../button";
import FormError from "../../form-error";
import SessionInput from "../../forms/session-form";
import Modal from "../../modal";
import { Day } from "../types";
import CREATE_SESSION from "./create-session.graphql";
import { initialCourseDefaultInput, initialInput } from "./initital-input";

const CreateSession: FC<PropTypes> = ({ day, onSubmit }) => {
	const [isOpen, openModal, closeModal] = useModal();
	const [input, setInput] = useState<SessionInputType>(initialInput({ startTime: day.unix }));

	const [createSession, { data, error }] = useMutation<Data, Vars>(CREATE_SESSION);

	const handleSubmit = () => {
		void createSession({
			variables: {
				input: {
					...input,
					startTime: millisecondsToSeconds(input.startTime),
					endTime: millisecondsToSeconds(input.endTime),
				},
			},
		});
	};

	const handleCourseReset = () => {
		setInput(prevState => ({
			...prevState,
			...initialCourseDefaultInput,
		}));
	};

	const handleCloseModal = () => {
		setInput(initialInput({ startTime: day.unix }));
		closeModal();
	};

	useEffect(() => {
		if (data) {
			closeModal();
			onSubmit();
		}
	}, [data]);

	useEffect(() => () => setInput(initialInput({ startTime: day.unix })), []);

	return (
		<Fragment>
			<Button
				transparent
				ariaLabel="Add new session"
				className="!w-5 !h-5 !p-1 -mt-0.5 -mr-0.5"
				leftIcon={className => <PlusIcon className={className} />}
				onClick={openModal}
			/>
			<Modal
				title="Create Session"
				subTitle={day.label}
				icon={className => <PlusIcon className={className} />}
				isOpen={isOpen}
				onClose={handleCloseModal}
				contentClassName="flex flex-col gap-4"
				children={
					<Fragment>
						<SessionInput input={input} onChange={setInput} onCourseReset={handleCourseReset} />
						<FormError error={error} />
					</Fragment>
				}
				buttons={
					input.courseID === "" ? undefined : (
						<Fragment>
							<Button
								text="Submit"
								ariaLabel="Submit"
								onClick={handleSubmit}
								leftIcon={className => <PlusIcon className={className} />}
							/>
							<Button
								transparent
								text="Cancel"
								ariaLabel="Cancel"
								onClick={handleCloseModal}
								leftIcon={className => <XMarkIcon className={className} />}
							/>
						</Fragment>
					)
				}
			/>
		</Fragment>
	);
};

type Data = CreateSessionMutation;
type Vars = CreateSessionMutationVariables;

interface PropTypes {
	day: Day;
	onSubmit: () => void;
}

export default CreateSession;
