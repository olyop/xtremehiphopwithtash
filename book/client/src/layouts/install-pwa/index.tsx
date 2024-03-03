import { FC, Fragment, ReactNode, createElement } from "react";

import { isUserAgentIOS } from "../../helpers/is-user-agent-ios";

const InstallPWA: FC<Props> = ({ renderCloseButton }) => {
	const isIOS = import.meta.env.MODE === "development" ? true : isUserAgentIOS();

	return (
		<div className="flex flex-col items-center gap-12 text-center">
			<h1 className="select-none text-2xl leading-relaxed">
				<b>
					<span className="bg-apple-store-get-blue rounded-full p-1 px-4 pb-[5px] text-white shadow-md">Get</span> the
					app for <br /> a <u>better experience!</u>
				</b>
			</h1>
			<img
				alt="iOS install helper"
				className={`w-80 ${isIOS ? "" : "rounded-2xl shadow-2xl"}`}
				src={isIOS ? "/pwa/install-helper-ios.png" : "/pwa/install-helper-android.png"}
			/>
			<div className="flex flex-col gap-2">
				<h2 className="text-lg">
					<b>Install Steps</b>
				</h2>
				<ul>
					{isIOS ? (
						<Fragment>
							<li>1. Tap the share button</li>
							<li>2. Tap &quot;Add to Home Screen&quot;</li>
							<li>3. Tap &quot;Add&quot;</li>
						</Fragment>
					) : (
						<Fragment>
							<li>1. Tap the menu button</li>
							<li>2. Tap &quot;Add to Home Screen&quot;</li>
							<li>3. Tap &quot;Add&quot;</li>
						</Fragment>
					)}
				</ul>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-lg">
					<b>What you get</b>
				</h2>
				<ul>
					<li>1. Faster load times</li>
					<li>2. Offline support</li>
					<li>3. Native app look & feel</li>
				</ul>
			</div>
			{renderCloseButton ? renderCloseButton() : null}
			<div className="flex flex-col gap-4">
				{isIOS && (
					<p className="w-64">
						<i>
							Safari has recently added support for <b>Progressive Web Apps</b>, so you can install it on your iOS
							device as a native app.
						</i>
					</p>
				)}
				<p className="w-64 text-gray-500">
					<u>This is completely optional,</u> and you can continue using the web app as you normally would.
				</p>
			</div>
		</div>
	);
};

interface Props {
	renderCloseButton?: () => ReactNode;
}

export default InstallPWA;
