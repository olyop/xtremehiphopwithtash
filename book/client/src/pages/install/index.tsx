import { FC, createElement } from "react";

import InstallPWA from "../../layouts/install-pwa";
import Page from "../page";

const InstallPage: FC = () => (
	<Page className="p-4 flex flex-col gap-16 pb-56">
		<h1 className="text-3xl pt-2 pb-4 px-8 font-bold text-center md:text-left border-b self-center">How to Install</h1>
		<InstallPWA />
	</Page>
);

export default InstallPage;
