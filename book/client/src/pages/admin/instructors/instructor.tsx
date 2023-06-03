import { MutationResult } from "@apollo/client";
import { FC, createElement, useState } from "react";

import InstructorInput from "../../../components/forms/instructor-form";
import {
	InstructorInput as InstructorInputType,
	Instructor as InstructorType,
} from "../../../generated-types";
import { determineDetailsName } from "../../../helpers";
import AdminEntity, { OnEditAndUpdate } from "../entity";
import { mapInstructorToInput } from "../map-entity-to-input";

const Instructor: FC<PropTypes> = ({
	instructor,
	onUpdate,
	onDelete,
	isUpdating,
	isDeleting,
	updateModalError,
	deleteModalError,
}) => {
	const [input, setInput] = useState<InstructorInputType>(mapInstructorToInput(instructor));
	return (
		<AdminEntity
			id={instructor.instructorID}
			photo={instructor.photo}
			typeName={instructor.__typename}
			isLargeEditModal
			editModalContent={
				<InstructorInput input={input} onChange={setInput} hideEmailAddress={false} />
			}
			onEdit={onUpdate(input)}
			onDelete={onDelete}
			isUpdating={isUpdating}
			isDeleting={isDeleting}
			editModalError={updateModalError}
			deleteModalError={deleteModalError}
			text={determineDetailsName(instructor.details)}
			description={instructor.details.mobilePhoneNumber}
		/>
	);
};

interface PropTypes {
	instructor: InstructorType;
	onUpdate: (input: InstructorInputType) => OnEditAndUpdate;
	onDelete: OnEditAndUpdate;
	isUpdating: boolean;
	isDeleting: boolean;
	updateModalError: MutationResult["error"];
	deleteModalError: MutationResult["error"];
}

export default Instructor;
