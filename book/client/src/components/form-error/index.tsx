import { ApolloError } from "@apollo/client/errors";
import { FC, Fragment, createElement } from "react";

import Error from "../error";

const FormError: FC<Props> = ({ error }) => (
	<Fragment>
		{error instanceof ApolloError ? (
			<Fragment>
				{error.graphQLErrors.length > 0 && (
					<Error
						errors={error.graphQLErrors.map(({ message }) => message)}
						isBadError={error.graphQLErrors.map(({ message }) => message).includes("INTERNAL_ERROR")}
					/>
				)}
				{error.networkError && <Error isBadError errors={[error.networkError.message]} />}
				{error.graphQLErrors.length === 0 && error.networkError === null && error.message && (
					<Error errors={[error.message]} />
				)}
			</Fragment>
		) : typeof error === "string" ? (
			<Error errors={[error]} />
		) : null}
	</Fragment>
);

interface Props {
	error: ApolloError | string | null | undefined;
}

export default FormError;
