import { MutationResult } from "@apollo/client/react/types/types";
import { FC, Fragment, createElement, useState } from "react";

import CourseInput from "../../../components/forms/course-form";
import { CourseInput as CourseInputType, Course as CourseType } from "../../../generated-types";
import { currencyDollarsFormatter, listFormatter } from "../../../helpers/intl";
import { centsToDollars } from "../../../utils";
import AdminEntity, { OnEditAndUpdate } from "../entity";
import { mapCourseToInput } from "../map-entity-to-input";

const Course: FC<PropTypes> = ({
	course,
	isUpdating,
	isDeleting,
	onUpdate,
	onDelete,
	updateModalError,
	deleteModalError,
}) => {
	const [input, setInput] = useState<CourseInputType>(mapCourseToInput(course));
	return (
		<AdminEntity
			id={course.courseID}
			photo={course.photo}
			typeName="Session"
			isLargeEditModal
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
						{course.defaultPrice ? currencyDollarsFormatter.format(centsToDollars(course.defaultPrice)) : "Free"}
						<Fragment>)</Fragment>
					</span>
				</Fragment>
			}
			description={
				<span className="text-gray-500">
					{listFormatter.format(
						course.defaultInstructors.map(({ details: { firstName, nickName } }) => nickName ?? firstName),
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
	updateModalError: MutationResult["error"] | undefined;
	deleteModalError: MutationResult["error"] | undefined;
}

export default Course;
