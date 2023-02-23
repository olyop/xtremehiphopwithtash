import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { ChangeEventHandler, FC, Fragment, createElement } from "react";

import Chip, { ChipInput } from "../chip";

export enum InputType {
	TEXT,
	INTEGER,
	URL,
	SELECT,
	ITEM,
	LIST,
}

const className =
	"border cursor-pointer outline-none w-full border-gray-200 hover:border-gray-400 transition-all rounded-md py-4 px-3 bg-transparent leading-none focus:border-gray-700";

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
		} else {
			if (type === InputType.INTEGER) {
				onChange(Number.parseInt(event.target.value, 10));
			} else {
				onChange(event.target.value);
			}
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
						value={value}
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
					value={value}
					className={className}
					onChange={handleChange}
					placeholder={placeHolder}
					autoComplete={autoComplete}
					min={type === InputType.INTEGER ? 0 : undefined}
					type={type === InputType.TEXT ? "text" : type === InputType.INTEGER ? "number" : "url"}
				/>
			)}
		</div>
	);
};

export type InputOnChange = (value: string[] | string | number) => void;

interface InputPropTypes {
	id: string;
	name: string;
	value: readonly string[] | string | number | undefined;
	placeHolder: string;
	autoComplete?: string;
	type: InputType;
	onChange: InputOnChange;
	selectOptions?: [optionID: string, optionDescription: string][] | undefined;
	items?: (ChipInput | null)[] | undefined;
}

export default Input;
