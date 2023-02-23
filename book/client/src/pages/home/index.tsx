import { FC, createElement } from "react";

import Schedule from "../../components/schedule";

const Home: FC = () => (
	<div className="flex items-center gap-2">
		<Schedule />
	</div>
);

export default Home;
