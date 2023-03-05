import { useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import {
	CreateSessionMutation,
	CreateSessionMutationVariables,
	SessionInput as SessionInputType,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import Button from "../../button";
import FormError from "../../form-error";
import Modal from "../../modal";
import SessionInput from "../session-input";
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
					notes: input.notes === "" ? null : input.notes,
					price: input.price === 0 ? null : input.price,
					startTime: Math.floor(input.startTime / 1000),
					endTime: Math.floor(input.endTime / 1000),
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

	useEffect(() => {
		if (data) {
			closeModal();
			onSubmit();
		}
	}, [data]);

	return (
		<Fragment>
			<Button
				transparent
				ariaLabel="Add new session"
				className="!w-6 !h-6 !p-1"
				leftIcon={className => <PlusIcon className={className} />}
				onClick={openModal}
			/>
			<Modal
				title="Create Session"
				subTitle={`${day.dayName} - ${day.label}`}
				icon={className => <PlusIcon className={className} />}
				isOpen={isOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				children={
					<Fragment>
						<SessionInput input={input} onChange={setInput} onCourseReset={handleCourseReset} />
						<FormError error={error} />
					</Fragment>
				}
				buttons={
					<Button
						text="Submit"
						ariaLabel="Submit"
						onClick={handleSubmit}
						leftIcon={className => <PlusIcon className={className} />}
					/>
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
