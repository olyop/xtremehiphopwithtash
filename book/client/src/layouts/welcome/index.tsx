import { useAuth0 } from "@auth0/auth0-react";
import ArrowLeftEndOnRectangle from "@heroicons/react/20/solid/ArrowLeftEndOnRectangleIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";

const Welcome: FC = () => {
	const { loginWithRedirect } = useAuth0();

	const handleLogin = () => {
		void loginWithRedirect({
			authorizationParams: {
				redirect_uri: window.location.origin,
			},
		});
	};

	const handleSignup = () => {
		void loginWithRedirect({
			authorizationParams: {
				redirect_uri: window.location.origin,
				screen_hint: "signup",
			},
		});
	};

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-12">
			<img src="/images/full-logo-small.png" alt="Xtreme Hip-Hop with Tash" width={320} height={126} />
			<div className="flex w-72 flex-col items-center justify-center gap-6 text-center">
				<h1 className="text-3xl">Welcome!</h1>
				<p className="text-xl">Please log in or sign up to view the class schedule, merchandise, and book sessions.</p>
				<p className="text-gray-500">
					Signup takes less than a minute!
					<br /> and you can start booking sessions right away!
				</p>
			</div>
			<div className="tiny:flex-row flex flex-col gap-4">
				<Button
					transparent
					text="Login"
					ariaLabel="Login"
					onClick={handleLogin}
					textClassName="text-xl"
					className="!h-16 gap-4 rounded-xl border px-6 hover:border-gray-300"
					leftIcon={className => <ArrowLeftEndOnRectangle className={`${className} h-7 w-7`} />}
				/>
				<Button
					transparent
					text="Signup"
					ariaLabel="Signup"
					onClick={handleSignup}
					textClassName="text-xl"
					className="!h-16 gap-4 rounded-xl border px-6 hover:border-gray-300"
					leftIcon={className => <ArrowLeftEndOnRectangle className={`${className} h-7 w-7`} />}
				/>
			</div>
		</div>
	);
};

export default Welcome;
