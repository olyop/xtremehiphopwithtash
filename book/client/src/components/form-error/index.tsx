import { ApolloError } from "@apollo/client/errors";
import { FC, Fragment, createElement } from "react";

import Error from "../error";

const FormError: FC<PropTypes> = ({ error }) => (
	<Fragment>
		{error && (
			<Fragment>
				{error.graphQLErrors.length > 0 && <Error errors={error.graphQLErrors.map(({ message }) => message)} />}
				{error.networkError && <Error isBadError errors={[error.networkError.message]} />}
			</Fragment>
		)}
	</Fragment>
);

interface PropTypes {
	error: ApolloError | undefined;
}

export default FormError;
