import { FC, createElement } from "react";

import Input, { InputOnChange, InputType, SelectOption } from "../../input";

const selectOptions: SelectOption[] = Array.from({ length: 50 }).map((_, index) => ({
	description: `${index + 1}`,
	optionID: `${index + 1}`,
}));

const SessionFormCapacityAndEquipment: FC<PropTypes> = ({
	capacityAvailable,
	equipmentAvailable,
	onCapacityAvailableChange,
	onEquipmentAvailableChange,
}) => {
	const handleCapacityAvailableChange: InputOnChange = value => {
		if (typeof value === "string") {
			onCapacityAvailableChange(Number.parseInt(value));
		}
	};

	const handleEquipmentAvailableChange: InputOnChange = value => {
		if (typeof value === "string") {
			onEquipmentAvailableChange(value === "" ? null : Number.parseInt(value));
		}
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			<Input
				id="capacity"
				name="Capacity"
				hideEmptySelectOptions
				autoComplete="off"
				type={InputType.SELECT}
				onChange={handleCapacityAvailableChange}
				value={`${capacityAvailable}`}
				selectOptions={selectOptions}
			/>
			<Input
				nullable
				id="equipmentAvailable"
				name="Steps Available"
				autoComplete="off"
				placeHolder="None"
				type={InputType.SELECT}
				onChange={handleEquipmentAvailableChange}
				value={equipmentAvailable ? `${equipmentAvailable}` : ""}
				selectOptions={selectOptions}
			/>
		</div>
	);
};

interface PropTypes {
	capacityAvailable: number;
	equipmentAvailable: number | null;
	onCapacityAvailableChange: InputOnChange;
	onEquipmentAvailableChange: InputOnChange;
}

export default SessionFormCapacityAndEquipment;
