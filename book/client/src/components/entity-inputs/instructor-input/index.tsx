import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import {
	DetailsInput as DetailsInputType,
	InstructorInput as InstructorInputType,
} from "../../../generated-types";
import Input, { InputOnChange, InputType } from "../../input";
import DetailsInput from "../details-input";

const InstructorInput: FC<PropTypes> = ({ input, onChange }) => {
	const handleChange =
		(key: keyof InstructorInputType): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const handleDetailsChange = (details: DetailsInputType) => {
		onChange(prevState => ({
			...prevState,
			details,
		}));
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
	onChange: Dispatch<SetStateAction<InstructorInputType>>;
}

export default InstructorInput;
