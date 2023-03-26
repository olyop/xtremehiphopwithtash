import { FC, createElement } from "react";

import Chip from "../../components/chip";
import { Session } from "../../generated-types";

const BookingModalTitleContent: FC<PropTypes> = ({ session }) => (
	<div className="flex gap-2">
		<div className="flex gap-1">
			{session.instructors.map(instructor => (
				<Chip
					key={instructor.instructorID}
					chip={{
						chipID: instructor.instructorID,
						text: instructor.details.nickName || instructor.details.firstName,
						photo: instructor.photo,
					}}
				/>
			))}
		</div>
		<span className="text-lg text-gray-500"> at </span>
		<Chip
			chip={{
				chipID: session.location.locationID,
				text: session.location.name,
			}}
		/>
	</div>
);

interface PropTypes {
	session: Session;
}

export default BookingModalTitleContent;
