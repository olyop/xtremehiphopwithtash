import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import { BookingInput, Session } from "../../../generated-types";
import { currencyFormatter } from "../../../intl";
import Input, { InputOnChange, InputType } from "../../input";

const BookingForm: FC<PropTypes> = ({ input, onChange, session: { equipmentAvailable } }) => {
	const handleChange =
		(key: keyof BookingInput): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const isEquipmentAvailable = equipmentAvailable > 0;

	return (
		<Fragment>
			<Input
				id="notes"
				name="Notes"
				autoComplete="off"
				placeHolder="Notes"
				value={input.notes}
				type={InputType.TEXTAREA}
				onChange={handleChange("notes")}
			/>
			<Input
				autoComplete="off"
				id="isBringingEquipment"
				type={InputType.CHECKBOX}
				disabled={!isEquipmentAvailable}
				value={input.isBringingOwnEquipment}
				onChange={handleChange("isBringingOwnEquipment")}
				name={`Bringing a step? (${isEquipmentAvailable ? equipmentAvailable : "none"} available)`}
			/>
			<p className="text-sm text-gray-500">
				Not bringing your own step will inccur a {currencyFormatter.format(2.5)} fee.
			</p>
		</Fragment>
	);
};

interface PropTypes {
	session: Session;
	input: BookingInput;
	onChange: Dispatch<SetStateAction<BookingInput>>;
}

export default BookingForm;
