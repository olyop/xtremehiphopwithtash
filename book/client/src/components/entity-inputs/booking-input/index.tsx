import { Dispatch, FC, SetStateAction, createElement } from "react";

import { BookingInput as BookingInputType } from "../../../generated-types";
import Input, { InputOnChange, InputType } from "../../input";

const BookingInput: FC<PropTypes> = ({ input, onChange }) => {
	const handleChange =
		(key: keyof BookingInputType): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	return (
		<div className="flex flex-col gap-4">
			<Input
				id="notes"
				name="Notes"
				placeHolder="Notes"
				autoComplete="off"
				type={InputType.TEXTAREA}
				onChange={handleChange("notes")}
				value={input.notes}
			/>
			<Input
				id="isBringingEquipment"
				name="Are you bringing a step?"
				placeHolder="Notes"
				autoComplete="off"
				type={InputType.CHECKBOX}
				onChange={handleChange("isBringingOwnEquipment")}
				value={input.isBringingOwnEquipment}
			/>
		</div>
	);
};

interface PropTypes {
	input: BookingInputType;
	onChange: Dispatch<SetStateAction<BookingInputType>>;
}

export default BookingInput;
