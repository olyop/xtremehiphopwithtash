import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import { BookingInput, Session } from "../../../generated-types";
import { currencyFormatter } from "../../../intl";
import Input, { InputOnChange, InputType } from "../../input";

const BookingForm: FC<PropTypes> = ({ input, onChange, hideEquipmentFee = false, session }) => {
	const handleChange =
		(key: keyof BookingInput): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const { equipmentAvailable, equipmentFee } = session;

	const isEquipmentAvailable = equipmentAvailable > 0;

	const handleIsBringingEquipmentYes: InputOnChange = value => {
		if (typeof value === "boolean") {
			handleChange("isBringingOwnEquipment")(true);
		}
	};

	const handleIsBringingEquipmentNo: InputOnChange = value => {
		if (typeof value === "boolean") {
			handleChange("isBringingOwnEquipment")(false);
		}
	};

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
			<div className="flex flex-col gap-1">
				<p>Will you be bringing your own step?</p>
				<div className="flex flex-col">
					<Input
						autoComplete="off"
						id="isBringingEquipment"
						type={InputType.CHECKBOX}
						disabled={!isEquipmentAvailable}
						value={!!input.isBringingOwnEquipment}
						onChange={handleIsBringingEquipmentYes}
						name={`Yes${
							input.isBringingOwnEquipment
								? ` ${
										isEquipmentAvailable ? `(${equipmentAvailable} available)` : "(None available)"
								  }`
								: ""
						}`}
					/>
					<Input
						autoComplete="off"
						id="isBringingEquipment"
						type={InputType.CHECKBOX}
						disabled={!isEquipmentAvailable}
						value={input.isBringingOwnEquipment === false}
						onChange={handleIsBringingEquipmentNo}
						name="No"
					/>
				</div>
				{hideEquipmentFee || !equipmentFee || !input.isBringingOwnEquipment || (
					<p className="text-sm text-gray-500">
						Step hire will inccur a {currencyFormatter.format(equipmentFee)} fee.
					</p>
				)}
			</div>
		</Fragment>
	);
};

interface PropTypes {
	session: Session;
	input: BookingInput;
	hideEquipmentFee?: boolean;
	onChange: Dispatch<SetStateAction<BookingInput>>;
}

export default BookingForm;
