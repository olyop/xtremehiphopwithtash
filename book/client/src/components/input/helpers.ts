import { HTMLInputTypeAttribute } from "react";

import { ChipInput } from "../chip";
import { InputSelectOptions, InputType, InputValue, SelectOption } from "./types";

export const isArrayOfStrings = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every(item => typeof item === "string");

export const convertUnixTimeToTimeInput = (unixTime: number) => {
	const date = new Date(unixTime);
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date.toISOString().slice(11, 16);
};

export const convertTimeInputToUnixTime = (value: number, timeInput: string) => {
	const date = new Date(value);
	const hours = Number.parseInt(timeInput.slice(0, 2), 10);
	const minutes = Number.parseInt(timeInput.slice(3, 5), 10);
	date.setHours(hours);
	date.setMinutes(minutes);
	return date.getTime();
};

export const convertUnixTimeToDateTimeInput = (unixTime: number) => {
	const date = new Date(unixTime);
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date.toISOString().slice(0, 16);
};

export const convertDateTimeInputToUnixTime = (value: number, dateTimeInput: string) => {
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

export const determineInputValue = (
	type: InputType,
	value: InputValue,
	selectOptions: InputSelectOptions | undefined,
): string | number => {
	if (value === undefined || value === null) {
		return type === InputType.PRICE || type === InputType.INTEGER ? 0 : "";
	} else if (type === InputType.TIME && typeof value === "number") {
		return convertUnixTimeToTimeInput(value);
	} else if (type === InputType.DATE && typeof value === "number") {
		return convertUnixTimeToDateTimeInput(value);
	} else if (type === InputType.INTEGER && typeof value === "number") {
		return value;
	} else if (type === InputType.PRICE && typeof value === "number") {
		return value;
	} else if (type === InputType.CHECKBOX && typeof value === "boolean") {
		return String(value);
	} else if (type === InputType.SELECT && typeof value === "string") {
		return selectOptions?.find(option => option.optionID === value)?.optionID ?? "";
	} else if (type === InputType.TEXT && typeof value === "string") {
		return value;
	} else if (type === InputType.URL && typeof value === "string") {
		return value;
	} else if (type === InputType.TEXTAREA && typeof value === "string") {
		return value;
	} else if (type === InputType.MOBILE && typeof value === "string") {
		return value;
	} else {
		throw new Error(`Invalid input value of type ${typeof value} for input type ${type}`);
	}
};

export const determineInputType = (type: InputType): HTMLInputTypeAttribute =>
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
		: type === InputType.CHECKBOX
		? "checkbox"
		: type === InputType.MOBILE
		? "tel"
		: "text";

export const mapListToChips = <T>(
	list: readonly string[],
	allItems: readonly T[] | undefined,
	getID: (item: T) => string,
	mapper: (item: T) => ChipInput,
): ChipInput[] => {
	if (allItems) {
		return list.map<ChipInput>(id => {
			const item = allItems?.find(x => getID(x) === id);

			if (item === undefined) {
				throw new Error(`Item with ID ${id} not found`);
			}

			return mapper(item);
		});
	} else {
		return [];
	}
};

export const mapListToSelectOptions = <T>(
	list: readonly T[] | undefined,
	mapper: (item: T) => SelectOption,
): InputSelectOptions => {
	if (list === undefined) {
		return undefined;
	}

	if (list.length === 0) {
		return null;
	}

	return list.map(mapper);
};
