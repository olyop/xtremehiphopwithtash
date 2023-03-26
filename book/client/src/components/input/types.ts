export enum InputType {
	TEXT,
	TEXTAREA,
	INTEGER,
	PRICE,
	URL,
	SELECT,
	LIST,
	TIME,
	DATE,
	CHECKBOX,
}

export type InputValue = readonly string[] | string | number | boolean | null | undefined;

export type InputOnChange = (value: InputValue) => void;

export type InputSelectOptions = SelectOption[] | null | undefined;

export interface SelectOption {
	optionID: string;
	description: string;
}
