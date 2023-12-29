import { FC, PropsWithChildren, createElement } from "react";

const Page: FC<PropsWithChildren<Props>> = ({ id, className, children }) => (
	<main data-id={id} className={`w-full lg:w-[60rem] lg:mx-auto pb-56 ${className ?? ""}`}>
		{children}
	</main>
);

interface Props {
	id?: string;
	className?: string;
}

export default Page;
