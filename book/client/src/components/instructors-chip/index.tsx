import { FC, Fragment, createElement } from "react";

import { Instructor } from "../../generated-types";
import InstructorChip from "../instructor-chip";

const InstructorsChip: FC<PropTypes> = ({ className, instructors }) => (
	<div className={`flex items-center self-end ${className ?? ""}`}>
		{instructors.map((instructor, index) => (
			<Fragment key={instructor.instructorID}>
				{index > 0 && (
					<span className="mb-0.5 mx-[0.4rem] text-gray-500">{index === instructors.length - 1 ? "and" : ","}</span>
				)}
				<InstructorChip instructor={instructor} />
			</Fragment>
		))}
	</div>
);

interface PropTypes {
	className?: string;
	instructors: Instructor[];
}

export default InstructorsChip;
