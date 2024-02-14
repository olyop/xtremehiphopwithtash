import { FC, PropsWithChildren, createElement } from "react";

import Header from "../../layouts/header";

const Container: FC<PropsWithChildren> = ({ children }) => (
	<div className="w-screen h-screen">
		<Header />
		<div className="h-content-height">{children}</div>
	</div>
);

export default Container;
