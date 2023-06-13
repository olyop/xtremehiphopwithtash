import { ApolloError } from "@apollo/client/errors";
import { FC, Fragment, createElement } from "react";

const FormError: FC<PropTypes> = ({ error }) => (
	<Fragment>
		{error && (
			<div className="rounded border border-red-500 bg-red-50 px-4 py-3">
				{error.graphQLErrors.map(({ message }) => (
					<span key={message} className="text-red-500">
						{message}
					</span>
				))}
			</div>
		)}
	</Fragment>
);

interface PropTypes {
	error: ApolloError | undefined;
}

export default FormError;
