import { FC, createElement } from "react";

import Button from "../button";

const InstagramButton: FC = () => (
	<a
		target="_blank"
		rel="noreferrer"
		href="https://www.instagram.com/xtremehiphopwithtash/"
		className="fixed right-0 block bg-white bottom-2 w-[70px] h-[60px] shadow-[grey_0_0_5px] rounded-l-[3px] z-[9999]"
	>
		<Button
			transparent
			ariaLabel="Instagram"
			className="w-full h-full"
			childrenNode={<img alt="Instagram" src="/images/instagram.webp" className="w-[32px] h-[32px]" />}
		/>
	</a>
);

export default InstagramButton;
