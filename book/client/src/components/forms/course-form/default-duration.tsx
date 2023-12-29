import { Dispatch, FC, SetStateAction, createElement } from "react";

import { CourseInput } from "../../../generated-types";
import Input, { InputOnChange, InputType, SelectOption } from "../../input";

const selectOptions: SelectOption[] = Array.from({ length: 31 }).map((_, index) => ({
	description: `${5 * (index + 6)} minutes`,
	optionID: String(5 * (index + 6)),
}));

const DefaultDurationInput: FC<Props> = ({ value, onChange }) => {
	const handleChange: InputOnChange = inputValue => {
		if (typeof inputValue === "string") {
			onChange(prevState => ({
				...prevState,
				defaultDuration: Number.parseInt(inputValue) * 60,
			}));
		}
	};

	return (
		<Input
			id="defaultDuration"
			name="Default Duration"
			value={String(Math.floor(value / 60))}
			type={InputType.SELECT}
			onChange={handleChange}
			placeHolder="Please enter"
			selectOptions={selectOptions}
			autoComplete="off"
		/>
	);
};

interface Props {
	value: number;
	onChange: Dispatch<SetStateAction<CourseInput>>;
}

export default DefaultDurationInput;
