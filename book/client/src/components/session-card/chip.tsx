import { FC, createElement } from "react";

const SessionCardChip: FC<Props> = ({ text, colorClassName }) => (
	<p
		className={`rounded shadow uppercase text-xs font-bold text-white p-0.5 whitespace-nowrap select-none ${colorClassName}`}
	>
		{text}
	</p>
);

interface Props {
	text: string;
	colorClassName: string;
}

export default SessionCardChip;
