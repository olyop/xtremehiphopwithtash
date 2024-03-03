import { OperationVariables } from "@apollo/client";
import { QueryResult } from "@apollo/client/react/types/types";
import { ReactNode, createElement } from "react";

import FormError from "../components/form-error";
import Loading from "../components/loading";
import PageWithHeader, { PageWithHeaderProps } from "./page-with-header";

// eslint-disable-next-line @typescript-eslint/comma-dangle
const PageWithHeaderAndData = <Data, Vars extends OperationVariables = OperationVariables>({
	title,
	banner,
	queryResult,
	children,
	...pageWithHeaderProps
}: Props<Data, Vars>) => (
	<PageWithHeader
		title={typeof title === "function" ? title(queryResult) : title}
		banner={typeof banner === "function" ? banner(queryResult) : banner}
		{...pageWithHeaderProps}
	>
		{queryResult.data ? (
			children(queryResult.data)
		) : queryResult.loading ? (
			<div className="flex h-full w-full items-center justify-center justify-items-center">
				<Loading />
			</div>
		) : queryResult.error ? (
			<FormError error={queryResult.error} />
		) : null}
	</PageWithHeader>
);

interface Props<Data, Vars extends OperationVariables = OperationVariables>
	extends Omit<PageWithHeaderProps, "title" | "banner"> {
	title: ((data: QueryResult<Data, Vars>) => ReactNode) | ReactNode;
	banner?: ((data: QueryResult<Data, Vars>) => ReactNode) | ReactNode;
	queryResult: QueryResult<Data, Vars>;
	children: (data: Data) => ReactNode;
}

export default PageWithHeaderAndData;
