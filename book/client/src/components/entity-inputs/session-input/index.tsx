import { useQuery } from "@apollo/client";
import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import {
	GetSessionInputDataQuery,
	Instructor,
	SessionInput as SessionInputType,
} from "../../../generated-types";
import { secondsToMilliseconds } from "../../../utils";
import Input, {
	InputOnChange,
	InputType,
	mapListToChips,
	mapListToSelectOptions,
} from "../../input";
import GET_SESSION_INPUT_DATA from "./get-session-input-data.graphql";

const SessionInput: FC<PropTypes> = ({ input, onChange, onCourseReset }) => {
	const { data } = useQuery<GetSessionInputDataQuery>(GET_SESSION_INPUT_DATA);

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
			const course = data.getCourses.find(c => c.courseID === value);
			if (course) {
				onChange(prevState => ({
					...prevState,
					courseID: value,
					title: course.name,
					notes: "",
					price: course.defaultPrice ?? 0,
					capacity: course.defaultCapacity,
					locationID: course.defaultLocation.locationID,
					equipmentAvailable: course.defaultEquipmentAvailable,
					instructorIDs: course.defaultInstructors.map(({ instructorID }) => instructorID),
				}));
			} else {
				onCourseReset();
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

		if (typeof value === "number") {
			const course = data?.getCourses.find(c => c.courseID === input.courseID);
			if (course) {
				handleChange("endTime")(value + secondsToMilliseconds(course.defaultDuration));
			}
		}
	};

	return (
		<div className="flex flex-col gap-4">
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
						type={InputType.TEXT}
						onChange={handleChange("notes")}
						value={input.notes}
					/>
					<Input
						id="price"
						name="Price"
						placeHolder="Price"
						autoComplete="off"
						type={InputType.PRICE}
						onChange={handleChange("price")}
						value={input.price}
					/>
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
		</div>
	);
};

interface PropTypes {
	input: SessionInputType;
	onChange: Dispatch<SetStateAction<SessionInputType>>;
	onCourseReset?: () => void;
}

export default SessionInput;
