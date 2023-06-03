import { FC, Fragment, createElement } from "react";

import { DetailsInput } from "../../../generated-types";
import Input, { InputOnChange, InputType } from "../../input";

const DetailsForm: FC<PropTypes> = ({ input, onChange, hideEmailAddress = true }) => {
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
				placeHolder="First Name"
				value={input.firstName}
				type={InputType.TEXT}
				onChange={handleChange("firstName")}
			/>
			<Input
				id="lastName"
				name="Last Name"
				autoComplete="family-name"
				placeHolder="Last Name"
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
				placeHolder="Nick Name"
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
				type={InputType.MOBILE}
				onChange={handleChange("mobilePhoneNumber")}
				placeHolder="Mobile Number"
			/>
			{hideEmailAddress || (
				<Input
					id="emailAddress"
					name="Email Address"
					autoComplete="email"
					value={input.emailAddress}
					type={InputType.TEXT}
					onChange={handleChange("emailAddress")}
					placeHolder="Email Address"
				/>
			)}
			<Input
				optional
				id="instagramUsername"
				name="Instagram Username"
				value={input.instagramUsername ?? ""}
				type={InputType.TEXT}
				onChange={handleChange("instagramUsername")}
				placeHolder="Username"
			/>
		</Fragment>
	);
};

interface PropTypes {
	input: DetailsInput;
	hideEmailAddress?: boolean;
	onChange: (input: DetailsInput) => void;
}

export default DetailsForm;
