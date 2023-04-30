import { MutationResult } from "@apollo/client";
import { FC, Fragment, createElement, useState } from "react";

import CourseInput from "../../../components/forms/course-form";
import { CourseInput as CourseInputType, GetCoursesQuery } from "../../../generated-types";
import { currencyFormatter, listFormatter } from "../../../intl";
import { ArrayElement } from "../../../utils";
import AdminEntity, { OnEditAndUpdate } from "../entity";

const Course: FC<PropTypes> = ({
	course,
	isUpdating,
	isDeleting,
	onUpdate,
	onDelete,
	updateModalError,
	deleteModalError,
}) => {
	const { defaultInstructors, defaultLocation, ...courseInput } = course;

	const [input, setInput] = useState<CourseInputType>({
		...courseInput,
		defaultLocationID: defaultLocation?.locationID,
		defaultPrice: courseInput.defaultPrice === 0 ? null : courseInput.defaultPrice,
		defaultEquipmentFee:
			courseInput.defaultEquipmentFee === 0 ? null : courseInput.defaultEquipmentFee,
		defaultInstructorIDs: defaultInstructors.map(({ instructorID }) => instructorID),
	});

	return (
		<AdminEntity
			id={course.courseID}
			photo={course.photo}
			typeName={course.__typename}
			editModalContent={<CourseInput input={input} onChange={setInput} />}
			onEdit={onUpdate(input)}
			onDelete={onDelete}
			isUpdating={isUpdating}
			isDeleting={isDeleting}
			editModalError={updateModalError}
			deleteModalError={deleteModalError}
			text={
				<Fragment>
					{course.name}
					<Fragment> </Fragment>
					<span className="text-gray-500">
						<Fragment>(</Fragment>
						{course.defaultPrice ? currencyFormatter.format(course.defaultPrice) : "Free"}
						<Fragment>)</Fragment>
					</span>
				</Fragment>
			}
			description={
				<span className="text-gray-500">
					{listFormatter.format(
						defaultInstructors.map(({ details: { firstName, nickName } }) => nickName ?? firstName),
					)}
				</span>
			}
		/>
	);
};

interface PropTypes {
	course: ArrayElement<GetCoursesQuery["getCourses"]>;
	onUpdate: (input: CourseInputType) => OnEditAndUpdate;
	onDelete: OnEditAndUpdate;
	isUpdating: boolean;
	isDeleting: boolean;
	updateModalError: MutationResult["error"] | undefined;
	deleteModalError: MutationResult["error"] | undefined;
}

export default Course;
