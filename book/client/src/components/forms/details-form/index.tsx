import { FC, Fragment, createElement } from "react";

import { DetailsInput } from "../../../generated-types";
import Input, { InputOnChange, InputType } from "../../input";

const DetailsForm: FC<Props> = ({ input, onChange, hideNotes = false, isCreateAccount = false }) => {
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
			<div className="grid grid-cols-2 gap-3">
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
			</div>
			{!isCreateAccount && (
				<Input
					optional
					nullable
					id="nickName"
					name="Nick Name"
					autoComplete="nickname"
					placeHolder="Nick Name"
					value={input.nickName ?? ""}
					type={InputType.TEXT}
					onChange={handleChange("nickName")}
					note={hideNotes ? undefined : "This will be used instead of your name"}
				/>
			)}
			<Input
				id="mobilePhoneNumber"
				name="Mobile Number"
				autoComplete="tel"
				value={input.mobilePhoneNumber}
				type={InputType.MOBILE}
				onChange={handleChange("mobilePhoneNumber")}
				placeHolder="Mobile Number"
				note={hideNotes ? undefined : "We may need to contact you regarding your bookings"}
			/>
			<Input
				id="emailAddress"
				name="Email Address"
				autoComplete="username"
				value={input.emailAddress}
				type={InputType.TEXT}
				onChange={handleChange("emailAddress")}
				placeHolder="Email Address"
				disabled={isCreateAccount}
				note={hideNotes ? undefined : "Used for receiving booking confirmations"}
			/>
			<Input
				optional
				nullable
				id="instagramUsername"
				name="Instagram Username"
				value={input.instagramUsername ?? ""}
				type={InputType.TEXT}
				onChange={handleChange("instagramUsername")}
				placeHolder="Instagram Username"
			/>
		</Fragment>
	);
};

interface Props {
	input: DetailsInput;
	hideNotes?: boolean;
	isCreateAccount?: boolean;
	onChange: (input: DetailsInput) => void;
}

export default DetailsForm;
