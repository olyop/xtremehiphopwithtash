import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import Input, { InputOnChange, InputType } from "../../../components/input";
import { LocationInput as LocationInputType } from "../../../generated-types";

const LocationInput: FC<PropTypes> = ({ input, onChange }) => {
	const handleChange =
		(key: keyof LocationInputType): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	return (
		<Fragment>
			<Input
				id="name"
				name="Name"
				value={input.name}
				type={InputType.TEXT}
				onChange={handleChange("name")}
				autoComplete="off"
				placeHolder="e.g. Gym"
			/>
			<Input
				id="plusCode"
				name="Plus Code"
				value={input.plusCode}
				type={InputType.TEXT}
				onChange={handleChange("plusCode")}
				placeHolder="e.g. 4RRG5WPV+M2"
				autoComplete="off"
			/>
		</Fragment>
	);
};

interface PropTypes {
	input: LocationInputType;
	onChange: Dispatch<SetStateAction<LocationInputType>>;
}

export default LocationInput;
