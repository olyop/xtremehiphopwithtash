import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import { FC, createElement } from "react";

const Error: FC<PropTypes> = ({ errors, isBadError = false }) => (
	<div
		className={`rounded border px-4 py-3 flex flex-col gap-2 ${
			isBadError ? " border-red-500 bg-red-50" : " border-orange-500 bg-orange-50"
		}`}
	>
		<div className="flex gap-2 ml-[-0.2rem] items-center">
			{isBadError ? (
				<ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
			) : (
				<ExclamationCircleIcon className="h-5 w-5 text-orange-500" />
			)}
			<p className={isBadError ? "text-red-500" : "text-orange-500"}>{isBadError ? "Error" : "Notice"}</p>
		</div>
		{errors.map(error => (
			<p key={error} className={isBadError ? "text-red-500" : "text-orange-500"}>
				{error}
			</p>
		))}
	</div>
);

interface PropTypes {
	errors: string[];
	isBadError?: boolean;
}

export default Error;
