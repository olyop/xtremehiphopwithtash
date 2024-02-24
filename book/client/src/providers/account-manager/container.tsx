import { FC, PropsWithChildren, createElement } from "react";

import Header from "../../layouts/header";

const Container: FC<PropsWithChildren<Props>> = ({ shouldFetchAccount = true, children }) => (
	<div className="w-screen h-screen">
		<Header shouldFetchAccount={shouldFetchAccount} />
		<div className="h-content-height">{children}</div>
	</div>
);

interface Props {
	shouldFetchAccount?: boolean;
}

export default Container;
