import { useQuery } from "@apollo/client";
import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import { CourseInput as CourseInputType, GetCourseInputDataQuery } from "../../../generated-types";
import Input, {
	InputOnChange,
	InputType,
	mapListToChips,
	mapListToSelectOptions,
} from "../../input";
import GET_COURSE_INPUT_DATA from "./get-course-input-data.graphql";
import { OnInstructorDelete } from "./types";

const CourseInput: FC<PropTypes> = ({ input, onChange }) => {
	const { data } = useQuery<GetCourseInputDataQuery>(GET_COURSE_INPUT_DATA);

	const handleChange =
		(key: keyof CourseInputType): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const handleDefaultInstructorDelete: OnInstructorDelete =
		({ instructorID }) =>
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
				placeHolder="e.g. Yoga"
			/>
			<Input
				id="description"
				name="Description"
				value={input.description}
				type={InputType.TEXT}
				onChange={handleChange("description")}
				autoComplete="off"
				placeHolder="e.g. Yoga is a group of physical, mental, spiritual"
			/>
			<Input
				id="photo"
				name="Photo"
				value={input.photo}
				type={InputType.URL}
				onChange={handleChange("photo")}
				autoComplete="off"
				placeHolder="e.g. https://www.example.com/photo.jpg"
			/>
			<Input
				id="defaultPrice"
				name="Default Price"
				value={input.defaultPrice || 0}
				type={InputType.PRICE}
				onChange={handleChange("defaultPrice")}
				placeHolder="Default Price"
				autoComplete="off"
			/>
			<Input
				id="defaultDuration"
				name="Default Duration"
				value={input.defaultDuration}
				type={InputType.INTEGER}
				onChange={handleChange("defaultDuration")}
				placeHolder="Default Duration"
				autoComplete="off"
			/>
			<Input
				id="defaultCapacity"
				name="Default Capacity"
				value={input.defaultCapacity}
				type={InputType.INTEGER}
				onChange={handleChange("defaultCapacity")}
				placeHolder="Default Capacity"
				autoComplete="off"
			/>
			<Input
				id="defaultEquipmentAvailable"
				name="Default Steps Available"
				value={input.defaultEquipmentAvailable || 0}
				type={InputType.INTEGER}
				onChange={handleChange("defaultEquipmentAvailable")}
				placeHolder="Default Steps Available"
				autoComplete="off"
			/>
			<Input
				id="locationID"
				name="Default Location"
				autoComplete="off"
				value={input.defaultLocationID}
				type={InputType.SELECT}
				onChange={handleChange("defaultLocationID")}
				placeHolder="Default Location"
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
				placeHolder="Default Instructors"
				autoComplete="off"
				items={mapListToChips(
					input.defaultInstructorIDs,
					data?.getInstructors,
					({ instructorID }) => instructorID,
					({ instructorID, photo, details: { firstName, nickName } }) => ({
						chipID: instructorID,
						text: nickName ?? firstName,
						photo,
						onRemove: handleDefaultInstructorDelete({ instructorID }),
					}),
				)}
				selectOptions={mapListToSelectOptions(
					data?.getInstructors,
					({ instructorID, details: { firstName, nickName } }) => ({
						optionID: instructorID,
						description: nickName ?? firstName,
					}),
				)}
			/>
		</Fragment>
	);
};

interface PropTypes {
	input: CourseInputType;
	onChange: Dispatch<SetStateAction<CourseInputType>>;
}

export default CourseInput;
