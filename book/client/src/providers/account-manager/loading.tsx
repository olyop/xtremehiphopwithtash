import { QueryResult } from "@apollo/client/react/types/types";
import { FC, createElement } from "react";

import PageWithHeaderAndData from "../../pages/page-with-header-and-data";

const Loading: FC = () => (
	<PageWithHeaderAndData
		title="Loading"
		titleClassName="!border-b-0 text-transparent"
		queryResult={{ loading: true } as unknown as QueryResult<unknown>}
		children={() => null}
	/>
);

export default Loading;
