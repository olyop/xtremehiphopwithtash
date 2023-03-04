import { useMutation, useQuery } from "@apollo/client";
import { FC, createElement } from "react";

import { OnEditAndUpdate } from "../../../components/entity";
import {
	CourseInput as CourseInputType,
	Course as CourseType,
	Mutation,
	MutationDeleteCourseByIdArgs,
	MutationUpdateCourseByIdArgs,
	Query,
} from "../../../generated-types";
import Section from "../section";
import Course from "./course";
import CreateInstructor from "./create-course";
import DELETE_COURSE from "./delete-course.graphql";
import GET_COURSES from "./get-courses.graphql";
import UPDATE_COURSE from "./update-course.graphql";

const Courses: FC = () => {
	const { data } = useQuery<Pick<Query, "getCourses">>(GET_COURSES);

	const [updateCourse, updateResult] = useMutation<UpdateData, UpdateVars>(UPDATE_COURSE);
	const [deleteCourse, deleteResult] = useMutation<DeleteData, DeleteVars>(DELETE_COURSE);

	const handleUpdatecourse =
		({ courseID }: Pick<CourseType, "courseID">) =>
		(input: CourseInputType): OnEditAndUpdate =>
		async onClose => {
			const result = await updateCourse({
				refetchQueries: [GET_COURSES],
				variables: {
					courseID,
					input: {
						name: input.name,
						description: input.description,
						photo: input.photo,
						defaultPrice: input.defaultPrice === 0 ? null : input.defaultPrice,
						defaultDuration: input.defaultDuration,
						defaultCapacity: input.defaultCapacity,
						defaultEquipmentAvailable: input.defaultEquipmentAvailable,
						defaultLocationID: input.defaultLocationID,
						defaultInstructorIDs: input.defaultInstructorIDs,
					},
				},
			});

			if (result.data?.updateCourseByID) {
				onClose();
			}
		};

	const handleDeletecourse =
		({ courseID }: Pick<CourseType, "courseID">): OnEditAndUpdate =>
		async onClose => {
			const result = await deleteCourse({
				variables: { courseID },
				refetchQueries: [GET_COURSES],
			});

			if (result.data?.deleteCourseByID) {
				onClose();
			}
		};

	return (
		<Section<CourseType>
			title="Courses"
			items={data?.getCourses}
			create={<CreateInstructor />}
			renderItem={course => (
				<Course
					key={course.courseID}
					course={course}
					isUpdating={updateResult.loading}
					isDeleting={deleteResult.loading}
					onUpdate={handleUpdatecourse(course)}
					onDelete={handleDeletecourse(course)}
					updateModalError={updateResult.error}
					deleteModalError={deleteResult.error}
				/>
			)}
		/>
	);
};

type UpdateData = Pick<Mutation, "updateCourseByID">;
type DeleteData = Pick<Mutation, "deleteCourseByID">;
type UpdateVars = MutationUpdateCourseByIdArgs;
type DeleteVars = MutationDeleteCourseByIdArgs;

export default Courses;
