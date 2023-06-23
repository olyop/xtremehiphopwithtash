import { ApolloError } from "@apollo/client/errors";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { FC, Fragment, createElement } from "react";

const FormError: FC<PropTypes> = ({ error }) => (
	<Fragment>
		{error && (
			<div className="rounded border border-orange-500 bg-orange-50 px-4 py-3 flex flex-col gap-2">
				<div className="flex gap-2 ml-[-0.3rem]">
					<ExclamationCircleIcon className="h-6 w-6 text-orange-500" />
					<p className="text-orange-500">Notice</p>
				</div>
				{error.graphQLErrors.map(({ message }) => (
					<p key={message} className="text-orange-500">
						{message}
					</p>
				))}
			</div>
		)}
	</Fragment>
);

interface PropTypes {
	error: ApolloError | undefined;
}

export default FormError;
