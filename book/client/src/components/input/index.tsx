import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { ChangeEventHandler, FC, Fragment, createElement } from "react";

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

const currencyFormatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "AUD",
});

const className = (type: InputType, value: InputValue) =>
	`border cursor-pointer outline-none ${
		type === InputType.CHECKBOX ? "mt-[1px] ml-[1px]" : "w-full"
	} border-gray-200 hover:border-gray-400 transition-all rounded-md py-4 px-3 bg-transparent leading-none focus:border-gray-700 ${
		type === InputType.PRICE ? (value === 0 ? "pl-12" : "pl-8") : ""
	} ${type === InputType.TEXTAREA ? "resize-none" : ""}`;

const Input: FC<InputPropTypes> = ({
	id,
	type,
	name,
	value,
	autoComplete,
	placeHolder,
	selectOptions,
	onChange,
	items,
}) => {
	const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
		if (type === InputType.TIME && typeof value === "number") {
			onChange(convertTimeInputToUnixTime(value, event.target.value));
		} else if (type === InputType.DATE && typeof value === "number") {
			onChange(convertDateTimeInputToUnixTime(value, event.target.value));
		} else if (type === InputType.INTEGER || type === InputType.PRICE) {
			onChange(Number.parseInt(event.target.value, 10));
		} else if (type === InputType.TEXT || type === InputType.URL || type === InputType.TEXTAREA) {
			onChange(event.target.value);
		} else if (type === InputType.CHECKBOX) {
			onChange(event.target.checked);
		} else {
			throw new Error(`Invalid input type: ${type} ${value?.toString() ?? "unknown"}`);
		}
	};

	const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
		if (type === InputType.TEXTAREA) {
			onChange(event.target.value);
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
			className={`relative ${
				type === InputType.CHECKBOX ? "flex gap-2 flex-row-reverse justify-end" : ""
			}`}
		>
			<label
				children={name}
				htmlFor={type === InputType.LIST ? `${id}-select` : id}
				className={`${
					type === InputType.CHECKBOX
						? "text-base"
						: "uppercase font-bold text-xs absolute -top-1.5"
				} cursor-pointer left-3 bg-white z-50 select-none`}
			/>
			{type === InputType.LIST && items && selectOptions && (
				<div className="absolute flex items-center gap-1 top-7 left-2 -translate-y-1/2">
					{items.map(item => item && <Chip key={item?.text} chip={item} className="bg-white" />)}
				</div>
			)}
			{type === InputType.PRICE && typeof value === "number" && (
				<p className="absolute top-1/2 -translate-y-1/2 left-3">
					{value === 0 ? "Free" : currencyFormatter.format(value).slice(0, 2)}
				</p>
			)}
			{type === InputType.LIST && Array.isArray(value) ? (
				<Fragment>
					<select
						value=""
						name={name}
						id={`${id}-select`}
						placeholder={placeHolder}
						onChange={handleSelectChange}
						className={`${className(type, value)} appearance-none`}
					>
						{selectOptions === null ? (
							<option value="">None found</option>
						) : selectOptions === undefined ? (
							<option value="">Loading...</option>
						) : (
							<Fragment>
								<option value="">Please choose</option>
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
					<ChevronDownIcon className="w-4 h-4 absolute -translate-y-1/2 top-1/2 right-4 -z-10" />
				</Fragment>
			) : type === InputType.SELECT ? (
				<Fragment>
					<select
						id={id}
						name={name}
						placeholder={placeHolder}
						onChange={handleSelectChange}
						value={determineInputValue(type, value, selectOptions)}
						className={`${className(type, value)} appearance-none`}
					>
						{selectOptions === null ? (
							<option value="">None found</option>
						) : selectOptions === undefined ? (
							<option value="">Loading...</option>
						) : (
							<Fragment>
								<option value="">Please choose</option>
								{selectOptions.map(({ optionID, description }) => (
									<option key={optionID} value={optionID}>
										{description}
									</option>
								))}
							</Fragment>
						)}
					</select>
					<ChevronDownIcon className="w-4 h-4 absolute -translate-y-1/2 top-1/2 right-4 -z-10" />
				</Fragment>
			) : type === InputType.TEXTAREA ? (
				<textarea
					id={id}
					name={name}
					rows={5}
					maxLength={1024}
					placeholder={placeHolder}
					autoComplete={autoComplete}
					onChange={handleTextAreaChange}
					className={className(type, value)}
					value={determineInputValue(type, value, selectOptions)}
				/>
			) : (
				<input
					id={id}
					name={name}
					placeholder={placeHolder}
					autoComplete={autoComplete}
					onChange={handleInputChange}
					type={determineInputType(type)}
					className={className(type, value)}
					value={determineInputValue(type, value, selectOptions)}
					maxLength={1024}
					min={type === InputType.INTEGER || type === InputType.PRICE ? 0 : undefined}
					checked={type === InputType.CHECKBOX && typeof value === "boolean" ? value : undefined}
				/>
			)}
		</div>
	);
};

interface InputPropTypes {
	id: string;
	name: string;
	value: InputValue;
	placeHolder: string;
	autoComplete?: string;
	type: InputType;
	onChange: InputOnChange;
	selectOptions?: InputSelectOptions;
	items?: ChipInput[];
}

export { InputType, mapListToSelectOptions, mapListToChips };
export type { InputOnChange, SelectOption, InputSelectOptions };

export default Input;
