import { useQuery } from "@apollo/client";
import { FC, createElement } from "react";

import {
	GetStudentsQuery,
	GetStudentsQueryVariables,
	Student as StudentType,
} from "../../../generated-types";
import Section from "../section";
import GET_STUDENTS from "./get-students.graphql";
import Student from "./student";

const Students: FC = () => {
	const { data } = useQuery<GetStudentsQuery, GetStudentsQueryVariables>(GET_STUDENTS);
	return (
		<Section<StudentType>
			title="Students"
			items={data?.getStudents as StudentType[] | undefined}
			renderItem={student => <Student student={student} key={student.studentID} />}
		/>
	);
};

export default Students;
