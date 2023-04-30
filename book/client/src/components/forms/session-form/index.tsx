import { useQuery } from "@apollo/client";
import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import {
	GetSessionFormDataQuery,
	Instructor,
	SessionInput as SessionInputType,
} from "../../../generated-types";
import Input, {
	InputOnChange,
	InputType,
	mapListToChips,
	mapListToSelectOptions,
} from "../../input";
import GET_SESSION_FORM_DATA from "./get-session-form-data.graphql";

const SessionForm: FC<PropTypes> = ({ input, onChange, onCourseReset }) => {
	const { data } = useQuery<GetSessionFormDataQuery>(GET_SESSION_FORM_DATA);

	const handleChange =
		(key: keyof SessionInputType): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	const handleCourseChange: InputOnChange = value => {
		if (data && typeof value === "string" && onCourseReset) {
			const course = data.getCourses.find(({ courseID }) => courseID === value);
			if (course) {
				onChange(prevState => ({
					...prevState,
					courseID: value,
					title: course.name,
					notes: null,
					price: course.defaultPrice,
					equipmentFee: course.defaultEquipmentFee,
					capacity: course.defaultCapacity,
					locationID: course.defaultLocation.locationID,
					equipmentAvailable: course.defaultEquipmentAvailable,
					instructorIDs: course.defaultInstructors.map(({ instructorID }) => instructorID),
					endTime: prevState.startTime + course.defaultDuration * 1000,
				}));
			} else {
				onChange(prevState => ({
					...prevState,
					courseID: "",
				}));
			}
		}
	};

	const handleInstructorDelete =
		({ instructorID }: Pick<Instructor, "instructorID">) =>
		() => {
			onChange(prevState => ({
				...prevState,
				instructorIDs: input.instructorIDs.filter(id => id !== instructorID),
			}));
		};

	const handleStartTimeChange: InputOnChange = value => {
		handleChange("startTime")(value);

		if (typeof value === "number" && data) {
			const course = data.getCourses.find(({ courseID }) => courseID === input.courseID);
			if (course) {
				handleChange("endTime")(value + course.defaultDuration * 1000);
			}
		}
	};

	return (
		<Fragment>
			{onCourseReset && (
				<Input
					id="courseID"
					name="Course"
					placeHolder="Course"
					autoComplete="off"
					type={InputType.SELECT}
					onChange={handleCourseChange}
					value={input.courseID}
					selectOptions={mapListToSelectOptions(data?.getCourses, ({ courseID, name }) => ({
						optionID: courseID,
						description: name,
					}))}
				/>
			)}
			{input.courseID.length > 0 && (
				<Fragment>
					<Input
						id="title"
						name="Title"
						placeHolder="Title"
						autoComplete="off"
						type={InputType.TEXT}
						onChange={handleChange("title")}
						value={input.title}
					/>
					<Input
						id="notes"
						name="Notes"
						placeHolder="Notes"
						autoComplete="off"
						type={InputType.TEXTAREA}
						onChange={handleChange("notes")}
						value={input.notes}
					/>
					<div className="grid grid-cols-2 gap-2">
						<Input
							nullable
							id="price"
							name="Price"
							autoComplete="off"
							type={InputType.PRICE}
							onChange={handleChange("price")}
							value={input.price}
						/>
						<Input
							nullable
							id="equipmentFee"
							name="Step Fee"
							autoComplete="off"
							type={InputType.PRICE}
							onChange={handleChange("equipmentFee")}
							value={input.equipmentFee}
						/>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<Input
							id="capacity"
							name="Capacity"
							placeHolder="Capacity"
							autoComplete="off"
							type={InputType.INTEGER}
							onChange={handleChange("capacity")}
							value={input.capacity}
						/>
						<Input
							nullable
							id="equipmentAvailable"
							name="Steps"
							placeHolder="Steps Available"
							autoComplete="off"
							type={InputType.INTEGER}
							onChange={handleChange("equipmentAvailable")}
							value={input.equipmentAvailable}
						/>
					</div>
					<Input
						id="locationID"
						name="Location"
						placeHolder="Location"
						autoComplete="off"
						type={InputType.SELECT}
						onChange={handleChange("locationID")}
						value={input.locationID}
						selectOptions={mapListToSelectOptions(data?.getLocations, ({ locationID, name }) => ({
							optionID: locationID,
							description: name,
						}))}
					/>
					<Input
						id="instructorIDs"
						name="Instructors"
						value={input.instructorIDs}
						type={InputType.LIST}
						onChange={handleChange("instructorIDs")}
						placeHolder="Instructors"
						autoComplete="off"
						items={mapListToChips(
							input.instructorIDs,
							data?.getInstructors,
							({ instructorID }) => instructorID,
							({ instructorID, photo, details: { firstName, nickName } }) => ({
								chipID: instructorID,
								text: nickName ?? firstName,
								photo,
								onRemove: handleInstructorDelete({ instructorID }),
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
					<div className={`grid ${onCourseReset ? "grid-cols-2 gap-2" : "grid-row-2 gap-4"}`}>
						<Input
							id="startTime"
							name="Start Time"
							placeHolder="Start time"
							autoComplete="off"
							type={onCourseReset ? InputType.TIME : InputType.DATE}
							onChange={handleStartTimeChange}
							value={input.startTime}
						/>
						<Input
							id="endTime"
							name="End Time"
							placeHolder="End time"
							autoComplete="off"
							type={onCourseReset ? InputType.TIME : InputType.DATE}
							onChange={handleChange("endTime")}
							value={input.endTime}
						/>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

interface PropTypes {
	input: SessionInputType;
	onChange: Dispatch<SetStateAction<SessionInputType>>;
	onCourseReset?: () => void;
}

export default SessionForm;
