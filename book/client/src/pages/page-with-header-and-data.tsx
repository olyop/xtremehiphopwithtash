import { QueryResult } from "@apollo/client/react/types/types";
import { ReactNode, createElement } from "react";

import FormError from "../components/form-error";
import Loading from "../components/loading";
import PageWithHeader, { PageWithHeaderProps } from "./page-with-header";

// eslint-disable-next-line @typescript-eslint/comma-dangle
const PageWithHeaderAndData = <T,>({ queryResult, children, ...pageWithHeaderProps }: Props<T>) => (
	<PageWithHeader {...pageWithHeaderProps}>
		{queryResult.data ? (
			children(queryResult.data)
		) : queryResult.loading ? (
			<div className="flex items-center justify-center justify-items-center w-full h-full">
				<Loading />
			</div>
		) : queryResult.error ? (
			<FormError error={queryResult.error} />
		) : null}
	</PageWithHeader>
);

interface Props<T> extends PageWithHeaderProps {
	queryResult: QueryResult<T>;
	children: (data: T) => ReactNode;
}

export default PageWithHeaderAndData;
