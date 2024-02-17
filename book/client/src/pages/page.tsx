import { FC, PropsWithChildren, createElement } from "react";

const Page: FC<PropsWithChildren<PageProps>> = ({ id, className, children }) => (
	<main data-id={id} className={`w-full h-full lg:w-[60rem] lg:mx-auto pb-56 ${className ?? ""}`}>
		{children}
	</main>
);

export interface PageProps {
	id?: string | undefined;
	className?: string | undefined;
}

export default Page;
