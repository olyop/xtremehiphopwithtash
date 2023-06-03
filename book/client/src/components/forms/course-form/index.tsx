import { useQuery } from "@apollo/client";
import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import { CourseInput, GetCourseFormDataQuery, Instructor } from "../../../generated-types";
import { determineDetailsName } from "../../../helpers";
import Input, {
	InputOnChange,
	InputType,
	mapListToChips,
	mapListToSelectOptions,
} from "../../input";
import DefaultDurationInput from "./default-duration";
import GET_COURSE_FORM_DATA from "./get-course-form-data.graphql";

const CourseForm: FC<PropTypes> = ({ input, onChange }) => {
	const { data } = useQuery<GetCourseFormDataQuery>(GET_COURSE_FORM_DATA);

	const handleChange =
		(key: keyof CourseInput): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const handleDefaultInstructorDelete =
		({ instructorID }: Pick<Instructor, "instructorID">) =>
		() => {
			onChange(prevState => ({
				...prevState,
				defaultInstructorIDs: input.defaultInstructorIDs.filter(id => id !== instructorID),
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
				placeHolder="Please enter"
			/>
			<Input
				id="description"
				name="Description"
				value={input.description}
				type={InputType.TEXTAREA}
				onChange={handleChange("description")}
				autoComplete="off"
				placeHolder="Please enter"
			/>
			<Input
				id="photo"
				name="Photo"
				value={input.photo}
				type={InputType.URL}
				onChange={handleChange("photo")}
				autoComplete="off"
				placeHolder="Please enter"
			/>
			<DefaultDurationInput value={input.defaultDuration} onChange={onChange} />
			<div className="grid grid-cols-2 gap-2">
				<Input
					nullable
					id="defaultPrice"
					name="Default Price"
					value={input.defaultPrice}
					type={InputType.PRICE}
					onChange={handleChange("defaultPrice")}
					placeHolder="Please enter"
					autoComplete="off"
				/>
				<Input
					nullable
					id="defaultEquipmentFee"
					name="Default Step Fee"
					value={input.defaultEquipmentFee}
					type={InputType.PRICE}
					onChange={handleChange("defaultEquipmentFee")}
					placeHolder="Please enter"
					autoComplete="off"
				/>
			</div>
			<div className="grid grid-cols-2 gap-2">
				<Input
					id="defaultCapacity"
					name="Default Capacity"
					value={input.defaultCapacityAvailable}
					type={InputType.INTEGER}
					onChange={handleChange("defaultCapacityAvailable")}
					placeHolder="Please enter"
					autoComplete="off"
				/>
				<Input
					nullable
					id="defaultEquipmentAvailable"
					name="Default Steps"
					value={input.defaultEquipmentAvailable}
					type={InputType.INTEGER}
					onChange={handleChange("defaultEquipmentAvailable")}
					placeHolder="Please enter"
					autoComplete="off"
				/>
			</div>
			<Input
				id="locationID"
				name="Default Location"
				autoComplete="off"
				value={input.defaultLocationID}
				type={InputType.SELECT}
				onChange={handleChange("defaultLocationID")}
				selectOptions={mapListToSelectOptions(data?.getLocations, ({ locationID, name }) => ({
					optionID: locationID,
					description: name,
				}))}
			/>
			<Input
				id="defaultInstructorIDs"
				name="Default Instructors"
				value={input.defaultInstructorIDs}
				type={InputType.LIST}
				onChange={handleChange("defaultInstructorIDs")}
				autoComplete="off"
				items={mapListToChips(
					input.defaultInstructorIDs,
					data?.getInstructors,
					({ instructorID }) => instructorID,
					({ instructorID, photo, details }) => ({
						chipID: instructorID,
						text: determineDetailsName(details),
						photo,
						onRemove: handleDefaultInstructorDelete({ instructorID }),
					}),
				)}
				selectOptions={mapListToSelectOptions(
					data?.getInstructors,
					({ instructorID, details }) => ({
						optionID: instructorID,
						description: determineDetailsName(details),
					}),
				)}
			/>
		</Fragment>
	);
};

interface PropTypes {
	input: CourseInput;
	onChange: Dispatch<SetStateAction<CourseInput>>;
}

export default CourseForm;
