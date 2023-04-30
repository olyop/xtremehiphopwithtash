import { FC, Fragment, createElement } from "react";

import { Instructor } from "../../generated-types";
import InstructorChip from "../instructor-chip";

const InstructorsChip: FC<PropTypes> = ({ instructors }) => (
	<div className="flex items-center self-end">
		{instructors.map((instructor, index) => (
			<Fragment key={instructor.instructorID}>
				{index > 0 && (
					<span className="mb-0.5 mx-[0.4rem] text-gray-500">
						{index === instructors.length - 1 ? "and" : ","}
					</span>
				)}
				<InstructorChip instructor={instructor} />
			</Fragment>
		))}
	</div>
);

interface PropTypes {
	instructors: Instructor[];
}

export default InstructorsChip;