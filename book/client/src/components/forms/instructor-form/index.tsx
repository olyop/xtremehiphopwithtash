import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import { DetailsInput, InstructorInput } from "../../../generated-types";
import Input, { InputOnChange, InputType } from "../../input";
import DetailsForm from "../details-form";

const InstructorForm: FC<PropTypes> = ({ input, onChange, hideEmailAddress = true }) => {
	const handleChange =
		(key: keyof InstructorInput): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const handleDetailsChange = (details: DetailsInput) => {
		onChange(prevState => ({
			...prevState,
			details,
		}));
	};

	return (
		<Fragment>
			<DetailsForm
				input={input.details}
				onChange={handleDetailsChange}
				hideEmailAddress={hideEmailAddress}
			/>
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
	input: InstructorInput;
	hideEmailAddress?: boolean;
	onChange: Dispatch<SetStateAction<InstructorInput>>;
}

export default InstructorForm;
