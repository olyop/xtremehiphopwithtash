import { useMutation, useQuery } from "@apollo/client";
import { FC, createElement } from "react";

import {
	CourseInput as CourseInputType,
	Course as CourseType,
	GetCoursesQuery,
	Mutation,
	MutationDeleteCourseByIdArgs,
	MutationUpdateCourseByIdArgs,
} from "../../../generated-types";
import { ArrayElement, dollarsToCents } from "../../../utils";
import { OnEditAndUpdate } from "../entity";
import Section from "../section";
import Course from "./course";
import CreateInstructor from "./create-course";
import DELETE_COURSE from "./delete-course.graphql";
import GET_COURSES from "./get-courses.graphql";
import UPDATE_COURSE from "./update-course.graphql";

const Courses: FC = () => {
	const { data } = useQuery<GetCoursesQuery>(GET_COURSES);

	const [updateCourse, updateResult] = useMutation<UpdateData, UpdateVars>(UPDATE_COURSE);
	const [deleteCourse, deleteResult] = useMutation<DeleteData, DeleteVars>(DELETE_COURSE);

	const handleUpdatecourse =
		({ courseID }: Pick<CourseType, "courseID">) =>
		(input: CourseInputType): OnEditAndUpdate =>
		async onClose => {
			const course: CourseInputType = {
				name: input.name,
				description: input.description,
				photo: input.photo,
				defaultPrice: input.defaultPrice === null ? null : dollarsToCents(input.defaultPrice),
				defaultEquipmentFee: input.defaultEquipmentFee === null ? null : dollarsToCents(input.defaultEquipmentFee),
				defaultDuration: input.defaultDuration,
				defaultCapacityAvailable: input.defaultCapacityAvailable,
				defaultEquipmentAvailable: input.defaultEquipmentAvailable,
				defaultLocationID: input.defaultLocationID,
				defaultInstructorIDs: input.defaultInstructorIDs,
			};

			const result = await updateCourse({
				refetchQueries: [GET_COURSES],
				variables: {
					courseID,
					input: course,
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
		<Section<ArrayElement<GetCoursesQuery["getCourses"]>>
			title="Sessions"
			items={data?.getCourses}
			create={<CreateInstructor />}
			renderItem={course => (
				<Course
					key={course.courseID}
					course={course as CourseType}
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
