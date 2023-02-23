import { FC, Fragment, createElement } from "react";

import DetailsInput from "../../../components/details-input";
import Input, { InputOnChange, InputType } from "../../../components/input";
import {
	DetailsInput as DetailsInputType,
	InstructorInput as InstructorInputType,
} from "../../../generated-types";

const InstructorInput: FC<PropTypes> = ({ input, onChange }) => {
	const handleChange =
		(key: keyof InstructorInputType): InputOnChange =>
		value => {
			onChange({
				...input,
				[key]: value,
			});
		};

	const handleDetailsChange = (details: DetailsInputType) => {
		onChange({
			...input,
			details,
		});
	};

	return (
		<Fragment>
			<DetailsInput input={input.details} onChange={handleDetailsChange} />
			<Input
				id="photo"
				name="Photo"
				value={input.photo}
				type={InputType.URL}
				onChange={handleChange("photo")}
				autoComplete="off"
				placeHolder="e.g. https://example.com/photo.jpg"
			/>
		</Fragment>
	);
};

interface PropTypes {
	input: InstructorInputType;
	onChange: (input: InstructorInputType) => void;
}

export default InstructorInput;
