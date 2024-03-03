import { FC, Fragment, createElement } from "react";

const SidebarFooter: FC = () => (
	<footer className="flex flex-col bg-gray-100">
		<p className="border-t border-gray-300 px-6 py-3 text-xs text-gray-500">
			<Fragment>App created by </Fragment>
			<a href="https://oliverplummer.com.au/" target="_blank" rel="noreferrer" className="text-blue-500 underline">
				Oliver Plummer
			</a>
			<br />
			<Fragment>Source code: </Fragment>
			<a
				href="https://github.com/olyop/xtremehiphopwithtash"
				target="_blank"
				rel="noreferrer"
				className="text-blue-500 underline"
			>
				GitHub
			</a>
		</p>
		<p className="border-t border-gray-300 px-6 py-3">
			Copyright © {new Date().getFullYear()} Xtreme Hip-Hop with Tash
		</p>
	</footer>
);

export default SidebarFooter;
