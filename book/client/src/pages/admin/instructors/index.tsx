import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { FC, createElement } from "react";

import {
	DeleteInstructorMutation,
	GetInstructorsQuery,
	InstructorInput,
	Instructor as InstructorType,
	MutationDeleteInstructorByIdArgs,
	MutationUpdateInstructorByIdArgs,
	UpdateInstructorMutation,
} from "../../../generated-types";
import { ArrayElement } from "../../../utils";
import { OnAction } from "../entity";
import Section from "../section";
import CreateInstructor from "./create-instructor";
import DELETE_INSTRUCTOR from "./delete-instructor.graphql";
import GET_INSTRUCTORS from "./get-instructors.graphql";
import Instructor from "./instructor";
import UPDATE_INSTRUCTOR from "./update-instructor.graphql";

const AdminInstructors: FC = () => {
	const { data } = useQuery<GetInstructorsQuery>(GET_INSTRUCTORS);

	const [updateInstructor, updateResult] = useMutation<UpdateData, UpdateVars>(UPDATE_INSTRUCTOR);
	const [deleteInstructor, deleteResult] = useMutation<DeleteData, DeleteVars>(DELETE_INSTRUCTOR);

	const handleUpdateInstructor =
		({ instructorID }: Pick<InstructorType, "instructorID">) =>
		(input: InstructorInput): OnAction =>
		async onClose => {
			const result = await updateInstructor({
				refetchQueries: [{ query: GET_INSTRUCTORS }],
				variables: {
					instructorID,
					input,
				},
			});

			if (result.data?.updateInstructorByID) {
				onClose();
			}
		};

	const handleDeleteInstructor =
		({ instructorID }: Pick<InstructorType, "instructorID">): OnAction =>
		async onClose => {
			const result = await deleteInstructor({
				variables: { instructorID },
				refetchQueries: [{ query: GET_INSTRUCTORS }],
			});

			if (result.data?.deleteInstructorByID) {
				onClose();
			}
		};

	return (
		<Section<ArrayElement<GetInstructorsQuery["getInstructors"]>>
			title="Instructors"
			items={data?.getInstructors}
			create={<CreateInstructor />}
			renderItem={instructor => (
				<Instructor
					key={instructor.instructorID}
					instructor={instructor as InstructorType}
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

type UpdateData = UpdateInstructorMutation;
type DeleteData = DeleteInstructorMutation;
type UpdateVars = MutationUpdateInstructorByIdArgs;
type DeleteVars = MutationDeleteInstructorByIdArgs;

export default AdminInstructors;
