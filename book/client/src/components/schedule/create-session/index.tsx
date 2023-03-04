import { useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import {
	CreateSessionMutation,
	CreateSessionMutationVariables,
	SessionInput as SessionInputType,
} from "../../../generated-types";
import Button from "../../button";
import FormError from "../../form-error";
import Modal from "../../modal";
import { Day } from "../types";
import CREATE_SESSION from "./create-session.graphql";
import { initialInput } from "./initital-input";
import SessionInput from "./session-input";

const CreateSession: FC<PropTypes> = ({ day, isOpen, onClose }) => {
	const [input, setInput] = useState<SessionInputType>(initialInput);

	const [createSession, { data, error }] = useMutation<Data, Vars>(CREATE_SESSION);

	const handleSubmit = () => {
		void createSession({
			variables: {
				input: {
					...input,
					price: input.price === 0 ? null : input.price,
					startTime: Math.floor(input.startTime / 1000),
					endTime: Math.floor(input.endTime / 1000),
				},
			},
		});
	};

	useEffect(() => {
		if (data) {
			onClose();
		}
	}, [data]);

	return (
		<Modal
			title="Create Session"
			subTitle={day.label}
			icon={className => <PlusIcon className={className} />}
			isOpen={isOpen}
			onClose={onClose}
			contentClassName="flex flex-col gap-4"
			children={
				<Fragment>
					<SessionInput input={input} onChange={setInput} />
					<FormError error={error} />
				</Fragment>
			}
			buttons={
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
						leftIcon={className => <XCircleIcon className={className} />}
						onClick={onClose}
					/>
				</Fragment>
			}
		/>
	);
};

type Data = CreateSessionMutation;
type Vars = CreateSessionMutationVariables;

interface PropTypes {
	day: Day;
	isOpen: boolean;
	onClose: () => void;
}

export default CreateSession;
