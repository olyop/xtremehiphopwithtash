import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import { FC, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import Input, { InputOnChange, InputType } from "../../../components/input";
import {
	GetClassDescriptionQuery,
	UpdateClassDescriptionMutation,
	UpdateClassDescriptionMutationVariables,
} from "../../../generated-types";
import GET_CLASS_DESCRIPTION from "./get-class-description.graphql";
import UPDATE_CLASS_DESCRIPTION from "./update-class-description.graphql";

const ClassDescriptionForm: FC = () => {
	const [classDescription, setClassDescription] = useState<string | null>(null);

	const { data } = useQuery<GetClassDescriptionQuery>(GET_CLASS_DESCRIPTION);
	const [updateClassDescription, result] = useMutation<UpdateData, UpdateVars>(UPDATE_CLASS_DESCRIPTION);

	const handleClassDescriptionChange: InputOnChange = value => {
		if (typeof value === "string") {
			setClassDescription(value);
		}
	};

	const handleSave = () => {
		if (classDescription) {
			void updateClassDescription({
				variables: {
					value: classDescription,
				},
			});
		}
	};

	useEffect(() => {
		if (data) {
			setClassDescription(data.getClassDescription);
		}
	}, [data]);

	return (
		<div className="flex flex-col items-stretch gap-3">
			<h2 className="text-2xl">Description</h2>
			{classDescription ? (
				<div className="flex flex-col gap-2 items-stretch">
					<Input
						id="classDescription"
						value={classDescription}
						onChange={handleClassDescriptionChange}
						type={InputType.TEXTAREA}
						name="Description"
						className="!bg-white shadow !h-36"
						placeHolder="Please enter"
					/>
					<Button
						text={result.loading ? "Saving" : "Done"}
						ariaLabel="Save Class Description"
						onClick={handleSave}
						className="self-start"
						leftIcon={className => <CheckIcon className={className} />}
					/>
				</div>
			) : (
				<p className="text-gray-500">Loading...</p>
			)}
		</div>
	);
};

type UpdateData = UpdateClassDescriptionMutation;
type UpdateVars = UpdateClassDescriptionMutationVariables;

export default ClassDescriptionForm;
