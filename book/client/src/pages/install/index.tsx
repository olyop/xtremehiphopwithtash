import { FC, createElement } from "react";

import InstallPWA from "../../layouts/install-pwa";
import PageWithHeader from "../page-with-header";

const InstallPage: FC = () => (
	<PageWithHeader title="How to Install">
		<InstallPWA />
	</PageWithHeader>
);

export default InstallPage;
