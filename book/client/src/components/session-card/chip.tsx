import { FC, createElement } from "react";

const SessionCardChip: FC<PropTypes> = ({ text, colorClassName }) => (
	<p
		className={`rounded shadow uppercase text-xs font-bold text-white p-0.5 select-none ${colorClassName}`}
	>
		{text}
	</p>
);

interface PropTypes {
	text: string;
	colorClassName: string;
}

export default SessionCardChip;
