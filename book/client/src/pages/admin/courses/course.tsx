import { MutationResult } from "@apollo/client";
import { FC, Fragment, createElement, useState } from "react";

import Entity, { OnEditAndUpdate } from "../../../components/entity";
import { CourseInput as CourseInputType, Course as CourseType } from "../../../generated-types";
import CourseInput from "./course-input";

const currencyFormatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "AUD",
});

const instructorsFormatter = new Intl.ListFormat(undefined, {
	style: "narrow",
	type: "conjunction",
});

const Course: FC<PropTypes> = ({
	course,
	isUpdating,
	isDeleting,
	onUpdate,
	onDelete,
	updateModalError,
	deleteModalError,
}) => {
	const { defaultInstructors, defaultLocation, reviews, ...courseInput } = course;

	const [input, setInput] = useState<CourseInputType>({
		...courseInput,
		defaultPrice: courseInput.defaultPrice || 0,
		defaultLocationID: defaultLocation?.locationID,
		defaultInstructorIDs: defaultInstructors.map(({ instructorID }) => instructorID),
	});

	return (
		<Entity
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
					<span className="text-gray-400">
						<Fragment>(</Fragment>
						{course.defaultPrice ? currencyFormatter.format(course.defaultPrice) : "Free"}
						<Fragment>)</Fragment>
					</span>
				</Fragment>
			}
			description={
				<span className="text-gray-400">
					{instructorsFormatter.format(
						defaultInstructors.map(
							({ details: { firstName, lastName } }) => `${firstName} ${lastName}`,
						),
					)}
				</span>
			}
		/>
	);
};

interface PropTypes {
	course: CourseType;
	onUpdate: (input: CourseInputType) => OnEditAndUpdate;
	onDelete: OnEditAndUpdate;
	isUpdating: boolean;
	isDeleting: boolean;
	updateModalError: MutationResult["error"];
	deleteModalError: MutationResult["error"];
}

export default Course;
