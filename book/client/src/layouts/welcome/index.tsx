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
		<div className="h-full w-full flex flex-col items-center justify-center gap-12">
			<img src="images/full-logo-small.png" alt="Xtreme Hip-Hop with Tash" width={320} height={126} />
			<div className="flex flex-col items-center justify-center gap-6 text-center w-72">
				<h1 className="text-3xl">Welcome!</h1>
				<p className="text-xl">Please log in or sign up to view the class schedule, merchandise, and book sessions.</p>
				<p className="text-gray-500">
					Signup takes less than a minute!
					<br /> and you can start booking sessions right away!
				</p>
			</div>
			<div className="flex flex-col tiny:flex-row gap-4">
				<Button
					transparent
					text="Login"
					ariaLabel="Login"
					onClick={handleLogin}
					textClassName="text-xl"
					className="!h-16 px-6 border hover:border-gray-300 rounded-xl gap-4"
					leftIcon={className => <ArrowLeftEndOnRectangle className={`${className} w-7 h-7`} />}
				/>
				<Button
					transparent
					text="Signup"
					ariaLabel="Signup"
					onClick={handleSignup}
					textClassName="text-xl"
					className="!h-16 px-6 border hover:border-gray-300 rounded-xl gap-4"
					leftIcon={className => <ArrowLeftEndOnRectangle className={`${className} w-7 h-7`} />}
				/>
			</div>
		</div>
	);
};

export default Welcome;
