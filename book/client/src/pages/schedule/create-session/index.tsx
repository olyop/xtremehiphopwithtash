import { useMutation } from "@apollo/client/react/hooks/useMutation";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import SessionInput from "../../../components/forms/session-form";
import Modal from "../../../components/modal";
import {
	CreateSessionMutation,
	CreateSessionMutationVariables,
	SessionInput as SessionInputType,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import { dollarsToCents, millisecondsToSeconds } from "../../../utils";
import { Day } from "../types";
import CREATE_SESSION from "./create-session.graphql";
import { initialCourseDefaultInput, initialInput } from "./initital-input";

const CreateSession: FC<Props> = ({ day, onSubmit }) => {
	const [isOpen, openModal, closeModal] = useModal();
	const [input, setInput] = useState<SessionInputType>(initialInput({ startTime: day.unix }));

	const [createSession, { data, error }] = useMutation<Data, Vars>(CREATE_SESSION);

	const handleSubmit = () => {
		void createSession({
			variables: {
				input: {
					...input,
					price: input.price === null ? null : dollarsToCents(input.price),
					equipmentFee: input.equipmentFee === null ? null : dollarsToCents(input.equipmentFee),
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

	useEffect(
		() => () => {
			setInput(initialInput({ startTime: day.unix }));
		},
		[],
	);

	return (
		<Fragment>
			<Button
				transparent
				ariaLabel="Add new session"
				className="!w-5 !h-5 !p-1"
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
				children={<SessionInput input={input} onChange={setInput} onCourseReset={handleCourseReset} />}
				error={error}
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

interface Props {
	day: Day;
	onSubmit: () => void;
}

export default CreateSession;
