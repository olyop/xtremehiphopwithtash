import { FC, createElement } from "react";

import { Maybe, Session } from "../../../generated-types";
import Input, { InputOnChange, InputType, SelectOption } from "../../input";

const BookingQuantities: FC<PropTypes> = ({
	session,
	bookingQuantity,
	equipmentQuantity,
	onBookingQuantityChange,
	onEquipmentQuantityChange,
}) => {
	const maxBookingQuantity = session.capacityRemaining
		? session.capacityRemaining > 5
			? 5
			: 5 - (5 - session.capacityRemaining)
		: 0;

	const maxEquipmentQuantity = session.equipmentRemaining ? bookingQuantity : 0;

	const bookingQuantitySelectOptions: SelectOption[] = Array.from({
		length: maxBookingQuantity,
	}).map((_, index) => ({
		description: `${index + 1}`,
		optionID: String(index + 1),
	}));

	const bookingEquipmentSelectOptions: SelectOption[] = Array.from({
		length: maxEquipmentQuantity,
	})
		.map((_, index) => ({
			description: `${index + 1}`,
			optionID: String(index + 1),
		}))
		.slice(0, session.equipmentRemaining ?? 0);

	const handleBookingQuantityChange: InputOnChange = inputValue => {
		if (typeof inputValue === "string") {
			onBookingQuantityChange(Number.parseInt(inputValue));
			onEquipmentQuantityChange(null);
		}
	};

	const handleEquipmentQuantityChange: InputOnChange = inputValue => {
		if (typeof inputValue === "string") {
			onEquipmentQuantityChange(Number.parseInt(inputValue));
		}
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			<Input
				id="bookingQuantity"
				name="Quantity"
				hideEmptySelectOptions
				value={String(bookingQuantity)}
				onChange={handleBookingQuantityChange}
				selectOptions={bookingQuantitySelectOptions}
				type={InputType.SELECT}
			/>
			<Input
				id="equipmentQuantity"
				name="Step Hire"
				placeHolder={session.equipmentRemaining ? "None" : "None avaliable"}
				disabled={!session.equipmentRemaining}
				value={String(equipmentQuantity)}
				onChange={handleEquipmentQuantityChange}
				selectOptions={bookingEquipmentSelectOptions}
				type={InputType.SELECT}
			/>
		</div>
	);
};

interface PropTypes {
	session: Session;
	bookingQuantity: number;
	equipmentQuantity: Maybe<number>;
	onBookingQuantityChange: InputOnChange;
	onEquipmentQuantityChange: InputOnChange;
}

export default BookingQuantities;
