import { useQuery } from "@apollo/client";
import { FC, Fragment, createElement } from "react";

import { DetailsInput as DetailsInputType, Query } from "../../generated-types";
import Input, { InputOnChange, InputType } from "../input";
import GET_GENDERS from "./get-genders.graphql";
import { mapGendersToSelect } from "./map-genders-to-select";

const DetailsInput: FC<PropTypes> = ({ input, onChange }) => {
	const { data: getGendersData } = useQuery<Pick<Query, "getGenders">>(GET_GENDERS);

	const handleChange =
		(key: keyof DetailsInputType): InputOnChange =>
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
				id="nickName"
				name="Nick Name"
				autoComplete="nickname"
				placeHolder="e.g. Jan"
				value={input.nickName ?? ""}
				type={InputType.TEXT}
				onChange={handleChange("nickName")}
			/>
			<Input
				id="gender"
				name="Gender"
				placeHolder="Gender"
				autoComplete="sex"
				value={input.gender}
				type={InputType.SELECT}
				onChange={handleChange("gender")}
				selectOptions={mapGendersToSelect(getGendersData?.getGenders)}
			/>
			<Input
				id="mobilePhoneNumber"
				name="Mobile Number"
				autoComplete="tel"
				value={input.mobilePhoneNumber}
				type={InputType.TEXT}
				onChange={handleChange("mobilePhoneNumber")}
				placeHolder="e.g. 0412345678"
			/>
		</Fragment>
	);
};

interface PropTypes {
	input: DetailsInputType;
	onChange: (detailsInput: DetailsInputType) => void;
}

export default DetailsInput;
