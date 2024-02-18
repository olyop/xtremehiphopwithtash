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
			className={`text-3xl p-4 pt-8 py-4 font-bold text-center md:text-left border-b self-center ${
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
