import { MutationResult } from "@apollo/client/react/types/types";
import { FC, createElement, useState } from "react";

import InstructorInput from "../../../components/forms/instructor-form";
import { InstructorInput as InstructorInputType, Instructor as InstructorType } from "../../../generated-types";
import { determineDetailsName } from "../../../helpers/util";
import AdminEntity, { OnAction } from "../entity";
import { mapInstructorToInput } from "../map-entity-to-input";

const Instructor: FC<Props> = ({
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
			editModalContent={<InstructorInput input={input} onChange={setInput} />}
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

interface Props {
	instructor: InstructorType;
	onUpdate: (input: InstructorInputType) => OnAction;
	onDelete: OnAction;
	isUpdating: boolean;
	isDeleting: boolean;
	updateModalError: MutationResult["error"];
	deleteModalError: MutationResult["error"];
}

export default Instructor;
