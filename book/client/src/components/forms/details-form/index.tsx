import { useQuery } from "@apollo/client";
import { FC, Fragment, createElement } from "react";

import { DetailsInput, GetDetailsFormDataQuery } from "../../../generated-types";
import { capitalizeFirstLetter } from "../../../utils";
import Input, { InputOnChange, InputType, mapListToSelectOptions } from "../../input";
import GET_DETAILS_FORM_DATA from "./get-details-form-data.graphql";

const DetailsForm: FC<PropTypes> = ({ input, onChange }) => {
	const { data } = useQuery<GetDetailsFormDataQuery>(GET_DETAILS_FORM_DATA);

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
				id="nickName"
				name="Nick Name"
				autoComplete="nickname"
				placeHolder="e.g. Jan"
				note="This will be shown to other users"
				value={input.nickName ?? ""}
				type={InputType.TEXT}
				onChange={handleChange("nickName")}
			/>
			<Input
				optional
				id="gender"
				name="Gender"
				placeHolder="Gender"
				autoComplete="sex"
				value={input.gender}
				type={InputType.SELECT}
				onChange={handleChange("gender")}
				selectOptions={mapListToSelectOptions(data?.getGenders, gender => ({
					optionID: gender,
					description: capitalizeFirstLetter(gender.toLowerCase()),
				}))}
			/>
			<Input
				id="mobilePhoneNumber"
				name="Mobile Number"
				autoComplete="tel"
				note="This will be used to send you notifications"
				value={input.mobilePhoneNumber}
				type={InputType.TEXT}
				onChange={handleChange("mobilePhoneNumber")}
				placeHolder="e.g. 0412345678"
			/>
			<Input
				optional
				id="instagramUsername"
				name="Instagram Handle"
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
