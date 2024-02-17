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
	<Page id={id} className={`p-4 flex flex-col gap-10 pb-56 ${className}`}>
		<h1
			className={`text-3xl py-4 px-8 font-bold text-center md:text-left border-b self-center ${titleClassName ?? ""}`}
		>
			{title}
		</h1>
		<div className={`w-full h-full ${contentClassName ?? ""}`}>{children}</div>
	</Page>
);

export interface PageWithHeaderProps extends PageProps {
	title: string;
	titleClassName?: string | undefined;
	contentClassName?: string | undefined;
}

export default PageWithHeader;
