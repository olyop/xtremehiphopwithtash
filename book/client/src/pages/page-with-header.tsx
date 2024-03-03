import { FC, PropsWithChildren, ReactNode, createElement } from "react";

import Page, { PageProps } from "./page";

const PageWithHeader: FC<PropsWithChildren<PageWithHeaderProps>> = ({
	id,
	className,
	banner,
	title,
	titleClassName,
	contentClassName,
	children,
}) => (
	<Page id={id} className={`flex flex-col gap-10 ${className}`}>
		{banner}
		<h1
			className={`tiny:text-3xl self-center border-b-2 border-gray-300 px-10 pb-4 pt-10 text-center text-xl font-bold md:text-left ${
				titleClassName ?? ""
			}`}
		>
			{title}
		</h1>
		<div className={`h-full w-full p-4 pb-56 ${contentClassName ?? ""}`}>{children}</div>
	</Page>
);

export interface PageWithHeaderProps extends PageProps {
	banner?: ReactNode;
	title: ReactNode;
	titleClassName?: string | undefined;
	contentClassName?: string | undefined;
}

export default PageWithHeader;
