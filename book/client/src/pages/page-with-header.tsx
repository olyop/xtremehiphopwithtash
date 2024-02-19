import { FC, PropsWithChildren, createElement } from "react";

import Page, { PageProps } from "./page";

const PageWithHeader: FC<PropsWithChildren<PageWithHeaderProps>> = ({
	id,
	className,
	title,
	titleClassName,
	contentClassName,
	children,
}) => (
	<Page id={id} className={`flex flex-col gap-10 ${className}`}>
		<h1
			className={`text-xl tiny:text-3xl pt-10 px-10 pb-4 font-bold text-center md:text-left border-b-2 border-gray-300 self-center ${
				titleClassName ?? ""
			}`}
		>
			{title}
		</h1>
		<div className={`w-full h-full p-4 pb-56 ${contentClassName ?? ""}`}>{children}</div>
	</Page>
);

export interface PageWithHeaderProps extends PageProps {
	title: string;
	titleClassName?: string | undefined;
	contentClassName?: string | undefined;
}

export default PageWithHeader;
