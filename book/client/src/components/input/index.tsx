import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { ChangeEventHandler, FC, Fragment, createElement } from "react";

import Chip, { ChipInput } from "../chip";

const currencyFormatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "AUD",
});

export enum InputType {
	TEXT,
	INTEGER,
	PRICE,
	URL,
	SELECT,
	LIST,
	TIME,
	DATE,
}

const className =
	"border cursor-pointer outline-none w-full border-gray-200 hover:border-gray-400 transition-all rounded-md py-4 px-3 bg-transparent leading-none focus:border-gray-700";

const convertUnixTimeToTimeInput = (unixTime: number) => {
	const date = new Date(unixTime);
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date.toISOString().slice(11, 16);
};

const convertTimeInputToUnixTime = (value: number, timeInput: string) => {
	const date = new Date(value);
	const hours = Number.parseInt(timeInput.slice(0, 2), 10);
	const minutes = Number.parseInt(timeInput.slice(3, 5), 10);
	date.setHours(hours);
	date.setMinutes(minutes);
	return date.getTime();
};

const convertUnixTimeToDateTimeInput = (unixTime: number) => {
	const date = new Date(unixTime);
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date.toISOString().slice(0, 16);
};

const convertDateTimeInputToUnixTime = (value: number, dateTimeInput: string) => {
	const date = new Date(value);
	const year = Number.parseInt(dateTimeInput.slice(0, 4), 10);
	const month = Number.parseInt(dateTimeInput.slice(5, 7), 10);
	const day = Number.parseInt(dateTimeInput.slice(8, 10), 10);
	const hours = Number.parseInt(dateTimeInput.slice(11, 13), 10);
	const minutes = Number.parseInt(dateTimeInput.slice(14, 16), 10);
	date.setFullYear(year);
	date.setMonth(month - 1);
	date.setDate(day);
	date.setHours(hours);
	date.setMinutes(minutes);
	return date.getTime();
};

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
	const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
		event.preventDefault();

		if (type === InputType.LIST && Array.isArray(value)) {
			if (event.target.value.length === 0 || !value.includes(event.target.value)) {
				onChange([...(value as string[]), event.target.value]);
			}
		} else if (type === InputType.TIME && typeof value === "number") {
			onChange(convertTimeInputToUnixTime(value, event.target.value));
		} else if (type === InputType.DATE && typeof value === "number") {
			onChange(convertDateTimeInputToUnixTime(value, event.target.value));
		} else if (type === InputType.INTEGER || type === InputType.PRICE) {
			onChange(Number.parseInt(event.target.value, 10));
		} else if (type === InputType.TEXT || type === InputType.URL || type === InputType.SELECT) {
			onChange(event.target.value);
		}
	};

	return (
		<div className="relative">
			<label
				htmlFor={id}
				children={name}
				className="absolute uppercase font-bold text-xs -top-1.5 cursor-pointer left-3 bg-white z-50"
			/>
			{type === InputType.LIST && items && selectOptions && (
				<div className="absolute flex items-center gap-1 top-7 left-2 -translate-y-1/2">
					{items.map(item => item && <Chip key={item?.text} chip={item} className="bg-white" />)}
				</div>
			)}
			{type === InputType.LIST ? (
				<Fragment>
					<select
						id={`select-${id}`}
						name={name}
						value=""
						onChange={handleChange}
						placeholder={placeHolder}
						className={`appearance-none ${className}`}
					>
						<option value="">Please choose</option>
						{selectOptions?.map(([optionID, optionDescription]) => (
							<option key={optionID} value={optionID}>
								{optionDescription}
							</option>
						))}
					</select>
					<ChevronDownIcon className="w-4 h-4 absolute -translate-y-1/2 top-1/2 right-4 -z-10" />
				</Fragment>
			) : type === InputType.SELECT ? (
				<Fragment>
					<select
						id={id}
						name={name}
						value={value || ""}
						onChange={handleChange}
						placeholder={placeHolder}
						className={`${className} appearance-none`}
					>
						<option value="">Please choose</option>
						{selectOptions?.map(([optionID, optionDescription]) => (
							<option key={optionID} value={optionID}>
								{optionDescription}
							</option>
						))}
					</select>
					<ChevronDownIcon className="w-4 h-4 absolute -translate-y-1/2 top-1/2 right-4 -z-10" />
				</Fragment>
			) : (
				<input
					id={id}
					name={name}
					value={
						value === undefined || value === null
							? ""
							: type === InputType.TIME
							? convertUnixTimeToTimeInput(value as number)
							: type === InputType.DATE
							? convertUnixTimeToDateTimeInput(value as number)
							: value
					}
					className={`${className} ${
						type === InputType.PRICE ? (value === 0 ? "pl-12" : "pl-8") : ""
					}`}
					onChange={handleChange}
					placeholder={placeHolder}
					autoComplete={autoComplete}
					min={type === InputType.INTEGER || type === InputType.PRICE ? 0 : undefined}
					type={
						type === InputType.TEXT
							? "text"
							: type === InputType.INTEGER || type === InputType.PRICE
							? "number"
							: type === InputType.URL
							? "url"
							: type === InputType.DATE
							? "datetime-local"
							: type === InputType.TIME
							? "time"
							: "text"
					}
				/>
			)}
			{typeof value === "number" && type === InputType.PRICE && (
				<p className="absolute top-1/2 -translate-y-1/2 mt-[1px] left-3">
					{value === 0 ? "Free" : currencyFormatter.format(value).slice(0, 2)}
				</p>
			)}
		</div>
	);
};

export type InputOnChange = (value: string[] | string | number) => void;

interface InputPropTypes {
	id: string;
	name: string;
	value: readonly string[] | string | number | null | undefined;
	placeHolder: string;
	autoComplete?: string;
	type: InputType;
	onChange: InputOnChange;
	selectOptions?: [optionID: string, optionDescription: string][] | undefined;
	items?: (ChipInput | null)[] | undefined;
}

export default Input;
