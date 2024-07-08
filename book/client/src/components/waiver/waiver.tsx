import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import { FC, createElement } from "react";
import { NavLink } from "react-router-dom";

import Button from "../button";
import Input, { InputType } from "../input";

const Waiver: FC<WaiverProps> = ({ hasSigned, toggleHasSigned }) => (
	<div className="flex flex-col items-start gap-4">
		<NavLink to="/waiver">
			<Button
				ariaLabel="View waiver"
				text="View Waiver"
				leftIcon={iconClassName => <EyeIcon className={iconClassName} />}
			/>
		</NavLink>
		<div
			role="button"
			onClick={toggleHasSigned}
			onKeyDown={toggleHasSigned}
			className={`${hasSigned ? "bg-gray-100" : ""} flex flex-col gap-4 self-stretch rounded-lg border bg-white px-4 py-5 shadow-md`}
		>
			<Input
				id="waiver"
				type={InputType.CHECKBOX}
				name="Agree to waiver"
				value={hasSigned}
				autoComplete="off"
				labelClassName="!bg-transparent leading-none"
				className="pointer-events-none items-center gap-4"
			/>
			<p className="select-none text-sm">
				<b>By checking this box, I agree to the terms and conditions of the waiver.</b>
			</p>
		</div>
	</div>
);

export interface WaiverProps {
	hasSigned: boolean;
	toggleHasSigned: () => void;
}

export default Waiver;
