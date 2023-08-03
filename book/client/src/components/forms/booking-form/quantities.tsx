import { FC, Fragment, createElement } from "react";

import { Maybe, Session } from "../../../generated-types";
import Input, { InputOnChange, InputType, SelectOption } from "../../input";

const BookingQuantities: FC<PropTypes> = ({
	session,
	isEditing,
	bookingQuantity,
	equipmentQuantity,
	onBookingQuantityChange,
	onEquipmentQuantityChange,
}) => {
	const maxBookingQuantity = isEditing
		? bookingQuantity
		: session.capacityRemaining
		? session.capacityRemaining > 5
			? 5
			: 5 - (5 - session.capacityRemaining)
		: 0;

	const bookingQuantitySelectOptions: SelectOption[] = Array.from({
		length: maxBookingQuantity,
	}).map((_, index) => ({
		description: `Book ${index + 1} spot${index + 1 > 1 ? "s" : ""}`,
		optionID: `${index + 1}`,
	}));

	const maxEquipmentQuantity = session.equipmentRemaining ? bookingQuantity : 0;

	const bookingEquipmentSelectOptions: SelectOption[] = Array.from({
		length: maxEquipmentQuantity,
	})
		.map((_, index) => ({
			description: `Hire ${index + 1} step${index + 1 > 1 ? "s" : ""}`,
			optionID: `${index + 1}`,
		}))
		.slice(0, isEditing ? bookingQuantity : session.equipmentRemaining ?? 0);

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
		<Fragment>
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
		</Fragment>
	);
};

interface PropTypes {
	session: Session;
	bookingQuantity: number;
	isEditing: boolean;
	equipmentQuantity: Maybe<number>;
	onBookingQuantityChange: InputOnChange;
	onEquipmentQuantityChange: InputOnChange;
}

export default BookingQuantities;
