import { FC, PropsWithChildren, createElement } from "react";

const Page: FC<PropsWithChildren<PageProps>> = ({ id, className, children }) => (
	<main data-id={id} className={`w-full lg:w-[60rem] lg:mx-auto ${className ?? ""}`}>
		{children}
	</main>
);

export interface PageProps {
	id?: string | undefined;
	className?: string | undefined;
}

export default Page;
