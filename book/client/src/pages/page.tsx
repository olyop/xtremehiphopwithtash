import { FC, PropsWithChildren, createElement } from "react";

const Page: FC<PropsWithChildren<PropTypes>> = ({ id, className, children }) => (
	<div data-id={id} className={`w-full lg:w-[60rem] lg:mx-auto pb-56 ${className ?? ""}`}>
		{children}
	</div>
);

interface PropTypes {
	id?: string;
	className?: string;
}

export default Page;
