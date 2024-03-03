import { FC, createElement } from "react";

const SessionCardChip: FC<Props> = ({ text, colorClassName }) => (
	<p
		className={`select-none whitespace-nowrap rounded p-0.5 text-xs font-bold uppercase text-white shadow ${colorClassName}`}
	>
		{text}
	</p>
);

interface Props {
	text: string;
	colorClassName: string;
}

export default SessionCardChip;
