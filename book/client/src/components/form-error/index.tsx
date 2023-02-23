import { ApolloError } from "@apollo/client";
import { FC, Fragment, createElement } from "react";

const FormError: FC<PropTypes> = ({ error }) => (
	<Fragment>
		{error?.graphQLErrors.map(({ message }) => (
			<span key={message} className="text-red-500 text-sm">
				{message}
			</span>
		))}
	</Fragment>
);

interface PropTypes {
	error: ApolloError | undefined;
}

export default FormError;
