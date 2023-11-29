import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { FC, createElement } from "react";

import { GetStudentsQuery, GetStudentsQueryVariables, Student as StudentType } from "../../../generated-types";
import { currencyDollarsFormatter } from "../../../helpers/intl";
import { centsToDollars } from "../../../utils";
import Section from "../section";
import GET_STUDENTS from "./get-students.graphql";
import Student from "./student";

const Students: FC = () => {
	const { data } = useQuery<GetStudentsQuery, GetStudentsQueryVariables>(GET_STUDENTS);
	return (
		<Section<StudentType>
			title="Students"
			subTitle={
				data && data.getStudentsTotal && data.getBookingsTotal
					? `${data.getStudentsTotal} students, ${data.getBookingsTotal} bookings, ${currencyDollarsFormatter.format(
							centsToDollars(data.getGrossTotal ?? 0),
					  )} gross`
					: undefined
			}
			items={data?.getStudents as StudentType[] | null | undefined}
			renderItem={student => <Student student={student} key={student.studentID} />}
		/>
	);
};

export default Students;
