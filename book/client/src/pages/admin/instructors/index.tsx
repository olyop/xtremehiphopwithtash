import { useMutation, useQuery } from "@apollo/client";
import { FC, createElement } from "react";

import { OnEditAndUpdate } from "../../../components/entity";
import {
	InstructorInput,
	Instructor as InstructorType,
	Mutation,
	MutationDeleteInstructorByIdArgs,
	MutationUpdateInstructorByIdArgs,
	Query,
} from "../../../generated-types";
import Section from "../section";
import CreateInstructor from "./create-instructor";
import DELETE_INSTRUCTOR from "./delete-instructor.graphql";
import GET_INSTRUCTORS from "./get-instructors.graphql";
import Instructor from "./instructor";
import UPDATE_INSTRUCTOR from "./update-instructor.graphql";

const Instructors: FC = () => {
	const { data } = useQuery<Pick<Query, "getInstructors">>(GET_INSTRUCTORS);

	const [updateInstructor, updateResult] = useMutation<UpdateData, UpdateVars>(UPDATE_INSTRUCTOR);
	const [deleteInstructor, deleteResult] = useMutation<DeleteData, DeleteVars>(DELETE_INSTRUCTOR);

	const handleUpdateInstructor =
		({ instructorID }: Pick<InstructorType, "instructorID">) =>
		(input: InstructorInput): OnEditAndUpdate =>
		async onClose => {
			const result = await updateInstructor({
				refetchQueries: [{ query: GET_INSTRUCTORS }],
				variables: {
					instructorID,
					input: {
						photo: input.photo,
						details: {
							firstName: input.details.firstName,
							lastName: input.details.lastName,
							nickName: input.details.nickName === "" ? null : input.details.nickName,
							gender: input.details.gender,
							mobilePhoneNumber: input.details.mobilePhoneNumber,
						},
					},
				},
			});

			if (result.data?.updateInstructorByID) {
				onClose();
			}
		};

	const handleDeleteInstructor =
		({ instructorID }: Pick<InstructorType, "instructorID">): OnEditAndUpdate =>
		async onClose => {
			const result = await deleteInstructor({
				variables: { instructorID },
				refetchQueries: [GET_INSTRUCTORS],
			});

			if (result.data?.deleteInstructorByID) {
				onClose();
			}
		};

	return (
		<Section<InstructorType>
			title="Instructors"
			items={data?.getInstructors}
			create={<CreateInstructor />}
			renderItem={instructor => (
				<Instructor
					key={instructor.instructorID}
					instructor={instructor}
					onUpdate={handleUpdateInstructor(instructor)}
					onDelete={handleDeleteInstructor(instructor)}
					isUpdating={updateResult.loading}
					isDeleting={deleteResult.loading}
					updateModalError={updateResult.error}
					deleteModalError={deleteResult.error}
				/>
			)}
		/>
	);
};

type UpdateData = Pick<Mutation, "updateInstructorByID">;
type DeleteData = Pick<Mutation, "deleteInstructorByID">;
type UpdateVars = MutationUpdateInstructorByIdArgs;
type DeleteVars = MutationDeleteInstructorByIdArgs;

export default Instructors;
