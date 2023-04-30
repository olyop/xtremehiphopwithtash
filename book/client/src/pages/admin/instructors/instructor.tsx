import { MutationResult } from "@apollo/client";
import { FC, Fragment, createElement, useState } from "react";

import InstructorInput from "../../../components/forms/instructor-form";
import {
	GetInstructorsQuery,
	InstructorInput as InstructorInputType,
} from "../../../generated-types";
import { ArrayElement } from "../../../utils";
import AdminEntity, { OnEditAndUpdate } from "../entity";

const Instructor: FC<PropTypes> = ({
	instructor,
	onUpdate,
	onDelete,
	isUpdating,
	isDeleting,
	updateModalError,
	deleteModalError,
}) => {
	const [input, setInput] = useState<InstructorInputType>(instructor);
	return (
		<AdminEntity
			id={instructor.instructorID}
			photo={instructor.photo}
			typeName={instructor.__typename}
			editModalContent={<InstructorInput input={input} onChange={setInput} />}
			onEdit={onUpdate(input)}
			onDelete={onDelete}
			isUpdating={isUpdating}
			isDeleting={isDeleting}
			editModalError={updateModalError}
			deleteModalError={deleteModalError}
			text={
				<Fragment>
					{instructor.details.firstName} {instructor.details.lastName}
					<span> </span>
					{instructor.details.nickName && (
						<span className="text-gray-500">({instructor.details.nickName})</span>
					)}
				</Fragment>
			}
			description={instructor.details.mobilePhoneNumber}
		/>
	);
};

interface PropTypes {
	instructor: ArrayElement<GetInstructorsQuery["getInstructors"]>;
	onUpdate: (input: InstructorInputType) => OnEditAndUpdate;
	onDelete: OnEditAndUpdate;
	isUpdating: boolean;
	isDeleting: boolean;
	updateModalError: MutationResult["error"];
	deleteModalError: MutationResult["error"];
}

export default Instructor;
