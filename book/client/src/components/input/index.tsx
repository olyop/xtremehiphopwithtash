import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { ChangeEventHandler, FC, Fragment, ReactNode, createElement } from "react";

import { currencyDollarsFormatter } from "../../helpers/intl";
import { capitalizeFirstLetter } from "../../utils";
import Chip, { ChipInput } from "../chip";
import {
	convertDateTimeInputToUnixTime,
	convertTimeInputToUnixTime,
	determineInputType,
	determineInputValue,
	isArrayOfStrings,
	mapListToChips,
	mapListToSelectOptions,
} from "./helpers";
import { InputOnChange, InputSelectOptions, InputType, InputValue, SelectOption } from "./types";

const createClassName = (type: InputType, value: InputValue, className: string | undefined, disabled: boolean) =>
	`border cursor-pointer outline-none ${type === InputType.CHECKBOX ? "mt-[1px] ml-[1px]" : "w-full"} border-gray-200 ${
		disabled ? "" : "hover:border-gray-400 transition-all"
	} rounded-md py-4 px-3 bg-transparent leading-none focus:border-gray-700 ${
		type === InputType.PRICE ? (value === null ? "pl-[3.25rem]" : "pl-6") : ""
	} ${type === InputType.TEXTAREA ? "resize-none h-[7rem]" : ""} ${className ?? ""}`;

const Input: FC<InputPropTypes> = ({
	id,
	type,
	name,
	note,
	value,
	nullable = false,
	disabled = false,
	optional = false,
	maxLength = 1024,
	className,
	noteClassName,
	labelClassName,
	autoComplete,
	placeHolder,
	selectOptions,
	hideEmptySelectOptions = false,
	onChange,
	items,
}) => {
	const isTextType = type === InputType.TEXT || type === InputType.URL || type === InputType.MOBILE;
	const isIntegerType = type === InputType.INTEGER || type === InputType.PRICE;

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { value: targetValue, checked } = event.target;

		if (type === InputType.TIME && typeof value === "number") {
			onChange(convertTimeInputToUnixTime(value, targetValue));
		} else if (type === InputType.DATE && typeof value === "number") {
			onChange(convertDateTimeInputToUnixTime(value, targetValue));
		} else if (isIntegerType) {
			if (targetValue.length === 0) {
				onChange(null);
			} else {
				const valueInt = Number.parseInt(targetValue, 10);
				onChange(nullable ? (valueInt === 0 ? null : valueInt) : valueInt);
			}
		} else if (isTextType) {
			onChange(nullable ? (targetValue.length === 0 ? null : targetValue) : targetValue);
		} else if (type === InputType.CHECKBOX) {
			onChange(checked);
		} else {
			throw new Error(`Invalid input type: ${type} ${value?.toString() ?? "unknown"}`);
		}
	};

	const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
		const { value: targetValue } = event.target;

		if (type === InputType.TEXTAREA) {
			onChange(nullable ? (targetValue.length === 0 ? null : targetValue) : targetValue);
		} else {
			throw new Error(`Invalid input type: ${type} ${value?.toString() ?? "unknown"}`);
		}
	};

	const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
		if (type === InputType.LIST && isArrayOfStrings(value)) {
			const isEmpty = event.target.value.length === 0;
			const isDuplicate = value.includes(event.target.value);

			if (isEmpty || !isDuplicate) {
				onChange([...value, event.target.value]);
			}
		} else if (type === InputType.SELECT) {
			onChange(event.target.value);
		} else {
			throw new Error(`Invalid input type: ${type} ${value?.toString() ?? "unknown"}`);
		}
	};

	return (
		<div
			className={`relative ${type === InputType.CHECKBOX ? "flex gap-2 flex-row-reverse justify-end" : ""} ${
				type === InputType.TEXTAREA ? (note ? "h-[8.5rem]" : "h-[7rem]") : ""
			} ${className ?? ""}`}
		>
			<label
				children={optional ? `${name} (optional)` : name}
				htmlFor={type === InputType.LIST ? `${id}-select` : id}
				className={`${
					type === InputType.CHECKBOX ? "text-base" : "uppercase font-bold text-xs absolute -top-1.5"
				} cursor-pointer left-3 bg-white z-50 select-none ${disabled ? "text-gray-400" : ""} ${labelClassName ?? ""}`}
			/>
			{type === InputType.LIST && items && selectOptions && (
				<div className="absolute flex items-center gap-1 top-[1.65rem] left-2 -translate-y-1/2 w-1/2 bg-white">
					{items.map(item => item && <Chip key={item?.text} chip={item} className="bg-white" />)}
				</div>
			)}
			{type === InputType.PRICE && (value === null || typeof value === "number") && (
				<p className="absolute top-1/2 -translate-y-1/2 left-3">
					{value === null ? "Free" : currencyDollarsFormatter.format(value).slice(0, 1)}
				</p>
			)}
			{type === InputType.LIST && Array.isArray(value) ? (
				<Fragment>
					<select
						value=""
						name={name}
						disabled={disabled}
						id={`${id}-select`}
						placeholder={placeHolder}
						onChange={handleSelectChange}
						className={`${createClassName(type, value, className, disabled)} appearance-none ${
							disabled ? "text-gray-400" : ""
						}`}
					>
						{selectOptions === null ? (
							<option value="">None found</option>
						) : selectOptions === undefined ? (
							<option value="">Loading...</option>
						) : (
							<Fragment>
								{hideEmptySelectOptions || <option value="">{placeHolder ?? "Please choose"}</option>}
								{selectOptions
									.filter(({ optionID }) => !value.includes(optionID))
									.map(({ optionID, description }) => (
										<option key={optionID} value={optionID}>
											{description}
										</option>
									))}
							</Fragment>
						)}
					</select>
					<ChevronDownIcon
						className={`w-4 h-4 absolute -translate-y-1/2 top-1/2 right-4 -z-10 ${disabled ? "text-gray-500" : ""}`}
					/>
				</Fragment>
			) : type === InputType.SELECT ? (
				<Fragment>
					<select
						id={id}
						name={name}
						disabled={disabled}
						placeholder={placeHolder}
						onChange={handleSelectChange}
						value={determineInputValue(type, value, selectOptions)}
						className={`${createClassName(type, value, className, disabled)} appearance-none ${
							disabled ? "text-gray-400" : ""
						}`}
					>
						{selectOptions === null ? (
							<option value="">None found</option>
						) : selectOptions === undefined ? (
							<option value="">Loading...</option>
						) : (
							<Fragment>
								{hideEmptySelectOptions || <option value="">{placeHolder ?? "Please choose"}</option>}
								{selectOptions.map(({ optionID, description }) => (
									<option key={optionID} value={optionID}>
										{capitalizeFirstLetter(description)}
									</option>
								))}
							</Fragment>
						)}
					</select>
					<ChevronDownIcon
						className={`w-4 h-4 absolute -translate-y-1/2 top-1/2 right-4 -z-10 ${disabled ? "text-gray-500" : ""}`}
					/>
				</Fragment>
			) : type === InputType.TEXTAREA ? (
				<textarea
					id={id}
					name={name}
					rows={5}
					maxLength={maxLength}
					placeholder={placeHolder}
					autoComplete={autoComplete}
					onChange={handleTextAreaChange}
					className={createClassName(type, value, className, disabled)}
					value={determineInputValue(type, value, selectOptions)}
				/>
			) : (
				<input
					id={id}
					name={name}
					disabled={disabled}
					placeholder={placeHolder}
					autoComplete={autoComplete}
					onChange={handleInputChange}
					type={determineInputType(type)}
					max={isIntegerType ? 50 : undefined}
					step={isIntegerType ? 1 : undefined}
					min={isIntegerType ? (nullable ? 0 : 1) : undefined}
					value={determineInputValue(type, value, selectOptions)}
					className={createClassName(type, value, className, disabled)}
					checked={type === InputType.CHECKBOX && typeof value === "boolean" ? value : undefined}
					maxLength={type === InputType.MOBILE ? 14 : maxLength}
				/>
			)}
			{note && type !== InputType.CHECKBOX && (
				<p
					className={`text-gray-500 text-xs md:text-sm px-3 pb-1 ${
						noteClassName ?? ""
					} whitespace-nowrap overflow-hidden overflow-ellipsis`}
				>
					{note}
				</p>
			)}
		</div>
	);
};

interface InputPropTypes {
	id: string;
	name: string;
	note?: ReactNode;
	nullable?: boolean;
	disabled?: boolean;
	className?: string;
	maxLength?: number;
	noteClassName?: string | undefined;
	labelClassName?: string;
	value: InputValue;
	placeHolder?: string;
	optional?: boolean;
	autoComplete?: string;
	type: InputType;
	onChange: InputOnChange;
	selectOptions?: InputSelectOptions;
	hideEmptySelectOptions?: boolean;
	items?: ChipInput[];
}

export { InputType, mapListToSelectOptions, mapListToChips };
export type { InputOnChange, SelectOption, InputSelectOptions };

export default Input;
