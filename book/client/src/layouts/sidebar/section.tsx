import { FC, PropsWithChildren, createElement } from "react";

const SidebarSecion: FC<PropsWithChildren<Props>> = ({ title, children }) => (
	<div className="flex flex-col gap-4 border-b pb-4">
		<h2 className="px-6 uppercase">
			<b>
				<u>{title}</u>
			</b>
		</h2>
		<div className="flex flex-col gap-2">{children}</div>
	</div>
);

interface Props {
	title: string;
}

export default SidebarSecion;
