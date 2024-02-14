import { FC, createElement } from "react";

import LoadingBase from "../../components/loading";

const Loading: FC = () => (
	<div className="w-full h-full flex items-center justify-center">
		<LoadingBase />
	</div>
);

export default Loading;
