import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import { BookingInput, Session } from "../../../generated-types";
import { currencyFormatter } from "../../../intl";
import Input, { InputOnChange, InputType } from "../../input";
import BookingQuantities from "./quantities";

const BookingForm: FC<PropTypes> = ({ input, onChange, hideEquipmentFee = false, session }) => {
	const handleChange =
		(key: keyof BookingInput): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const { price, equipmentFee } = session;

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
			<BookingQuantities
				session={session}
				bookingQuantity={input.bookingQuantity}
				equipmentQuantity={input.equipmentQuantity}
				onBookingQuantityChange={handleChange("bookingQuantity")}
				onEquipmentQuantityChange={handleChange("equipmentQuantity")}
			/>
			{price === null && (
				<div className="px-4 py-3 border border-green-500 rounded bg-green-50 flex gap-2">
					<InformationCircleIcon className="h-6 w-6" />
					<p>Free session</p>
				</div>
			)}
			{hideEquipmentFee || !equipmentFee || (
				<p className="text-sm text-gray-500">
					Step hire will inccur a {currencyFormatter.format(equipmentFee)} fee.
				</p>
			)}
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
