import { FC, PropsWithChildren, createElement } from "react";

const Page: FC<PropsWithChildren<PropTypes>> = ({ className, children }) => (
	<div className={`w-full lg:w-[60rem] lg:mx-auto pb-56 ${className ?? ""}`}>{children}</div>
);

interface PropTypes {
	className?: string;
}

export default Page;
