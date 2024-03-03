import { FC, Fragment, createElement } from "react";

import { Instructor } from "../../generated-types";
import InstructorChip from "../instructor-chip";

const InstructorsChip: FC<Props> = ({ className, instructors, showFullName = false }) => (
	<div className={`flex items-center self-end ${className ?? ""}`}>
		{instructors.map((instructor, index) => (
			<Fragment key={instructor.instructorID}>
				{index > 0 && (
					<span className="mx-[0.4rem] mb-0.5 text-gray-500">{index === instructors.length - 1 ? "and" : ","}</span>
				)}
				<InstructorChip instructor={instructor} showFullName={showFullName} />
			</Fragment>
		))}
	</div>
);

interface Props {
	className?: string;
	showFullName?: boolean;
	instructors: Instructor[];
}

export default InstructorsChip;
