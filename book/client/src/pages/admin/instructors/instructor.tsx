import { MutationResult } from "@apollo/client";
import { FC, Fragment, createElement, useState } from "react";

import Entity, { OnEditAndUpdate } from "../../../components/entity";
import {
	InstructorInput as InstructorInputType,
	Instructor as InstructorType,
} from "../../../generated-types";
import InstructorInput from "./instructor-input";

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
		<Entity
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
						<span className="text-gray-400">{instructor.details.nickName}</span>
					)}
				</Fragment>
			}
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
