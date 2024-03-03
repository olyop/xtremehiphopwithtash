import { FC, PropsWithChildren, createElement } from "react";

const Page: FC<PropsWithChildren<PageProps>> = ({ id, className, children }) => (
	<main data-id={id} className={`w-full lg:mx-auto lg:w-[60rem] ${className ?? ""}`}>
		{children}
	</main>
);

export interface PageProps {
	id?: string | undefined;
	className?: string | undefined;
}

export default Page;
