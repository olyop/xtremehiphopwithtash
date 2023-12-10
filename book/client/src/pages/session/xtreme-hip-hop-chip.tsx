import { FC, createElement } from "react";

import Chip from "../../components/chip";

const XtremeHipHopChip: FC = () => (
	<Chip
		chip={{
			chipID: "Xtreme Hip-Hop",
			text: "Xtreme Hip-Hop",
			photo: "/images/logo-x.png",
		}}
	/>
);

export default XtremeHipHopChip;
