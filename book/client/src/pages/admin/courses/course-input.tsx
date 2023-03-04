import { useQuery } from "@apollo/client";
import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import Input, { InputOnChange, InputType } from "../../../components/input";
import { CourseInput as CourseInputType, Query } from "../../../generated-types";
import GET_INSTRUCTORS from "../instructors/get-instructors.graphql";
import GET_LOCATIONS from "../locations/get-locations.graphql";

const CourseInput: FC<PropTypes> = ({ input, onChange }) => {
	const { data: locationsData } = useQuery<GetLocationsData>(GET_LOCATIONS);
	const { data: instructorsData } = useQuery<GetInstructorsData>(GET_INSTRUCTORS);

	const handleChange =
		(key: keyof CourseInputType): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const handleDefaultInstructorDelete = (instructorID: string) => () => {
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
				name="Default Equipment Available"
				value={input.defaultEquipmentAvailable || 0}
				type={InputType.INTEGER}
				onChange={handleChange("defaultEquipmentAvailable")}
				placeHolder="Default Equipment Available"
				autoComplete="off"
			/>
			<Input
				id="locationID"
				name="Default Location"
				value={input.defaultLocationID}
				type={InputType.SELECT}
				onChange={handleChange("defaultLocationID")}
				placeHolder="Default Location"
				selectOptions={
					locationsData?.getLocations.map(location => [location.locationID, location.name]) ?? []
				}
				autoComplete="off"
			/>
			<Input
				id="defaultInstructorIDs"
				name="Default Instructors"
				value={input.defaultInstructorIDs}
				type={InputType.LIST}
				onChange={handleChange("defaultInstructorIDs")}
				placeHolder="Default Instructors"
				autoComplete="off"
				items={input.defaultInstructorIDs.map(instructorID => {
					const instructor = instructorsData?.getInstructors.find(
						x => x.instructorID === instructorID,
					);

					if (!instructor) {
						return null;
					}

					return {
						chipID: instructorID,
						text: instructor.details.firstName,
						photo: instructor.photo,
						onRemove: handleDefaultInstructorDelete(instructorID),
					};
				})}
				selectOptions={
					instructorsData?.getInstructors.map(instructor => [
						instructor.instructorID,
						instructor.details.firstName,
					]) || []
				}
			/>
		</Fragment>
	);
};

type GetLocationsData = Pick<Query, "getLocations">;
type GetInstructorsData = Pick<Query, "getInstructors">;

interface PropTypes {
	input: CourseInputType;
	onChange: Dispatch<SetStateAction<CourseInputType>>;
}

export default CourseInput;
