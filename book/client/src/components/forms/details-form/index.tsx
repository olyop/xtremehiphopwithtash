import { FC, Fragment, createElement } from "react";

import { DetailsInput } from "../../../generated-types";
import Input, { InputOnChange, InputType } from "../../input";

const DetailsForm: FC<PropTypes> = ({ input, onChange }) => {
	const handleChange =
		(key: keyof DetailsInput): InputOnChange =>
		value => {
			onChange({
				...input,
				[key]: value,
			});
		};

	return (
		<Fragment>
			<Input
				id="firstName"
				name="First Name"
				autoComplete="given-name"
				placeHolder="e.g. Jane"
				value={input.firstName}
				type={InputType.TEXT}
				onChange={handleChange("firstName")}
			/>
			<Input
				id="lastName"
				name="Last Name"
				autoComplete="family-name"
				placeHolder="e.g. Doe"
				value={input.lastName}
				type={InputType.TEXT}
				onChange={handleChange("lastName")}
			/>
			<Input
				optional
				nullable
				id="nickName"
				name="Nick Name"
				autoComplete="nickname"
				placeHolder="e.g. Jan"
				note="This will be used instead of your first name"
				value={input.nickName ?? ""}
				type={InputType.TEXT}
				onChange={handleChange("nickName")}
			/>
			<Input
				id="mobilePhoneNumber"
				name="Mobile Number"
				autoComplete="tel"
				note="We may need to contact you regarding your bookings"
				value={input.mobilePhoneNumber}
				type={InputType.TEXT}
				onChange={handleChange("mobilePhoneNumber")}
				placeHolder="e.g. 0412345678"
			/>
			<Input
				optional
				id="instagramUsername"
				name="Instagram Username"
				value={input.instagramUsername ?? ""}
				type={InputType.TEXT}
				onChange={handleChange("instagramUsername")}
				placeHolder="e.g. @janedoe"
			/>
		</Fragment>
	);
};

interface PropTypes {
	input: DetailsInput;
	onChange: (input: DetailsInput) => void;
}

export default DetailsForm;
