import { ApolloError } from "@apollo/client/errors";
import { FC, Fragment, createElement } from "react";

import Error from "../error";

const FormError: FC<PropTypes> = ({ error }) => (
	<Fragment>
		{error && (
			<Fragment>
				{error.graphQLErrors.length > 0 && (
					<Error
						errors={error.graphQLErrors.map(({ message }) => message)}
						isBadError={error.graphQLErrors.reduce((isBad, { message }) => {
							if (message.includes("INTERNAL_ERROR")) {
								return true;
							} else {
								return false;
							}
						}, false)}
					/>
				)}
				{error.networkError && <Error isBadError errors={[error.networkError.message]} />}
				{error.graphQLErrors.length === 0 && error.networkError === null && error.message && (
					<Error errors={[error.message]} />
				)}
			</Fragment>
		)}
	</Fragment>
);

interface PropTypes {
	error: ApolloError | undefined;
}

export default FormError;
