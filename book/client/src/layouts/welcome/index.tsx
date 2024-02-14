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

	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-12">
			<img src="images/full-logo.png" alt="Xtreme Hip-Hop with Tash" className="w-80" />
			<div className="flex flex-col items-center justify-center gap-6 text-center w-72">
				<h1 className="text-3xl">Welcome!</h1>
				<p className="text-xl">Please log in or sign up to view the class schedule, merchandise, and book sessions.</p>
				<p className="text-gray-500">
					Signup takes less than a minute!
					<br /> and you can start booking sessions right away!
				</p>
			</div>
			<div className="flex gap-4">
				<Button
					ariaLabel="Log In"
					text="Login / Signup"
					onClick={handleLogin}
					textClassName="text-xl"
					className="!h-16 px-6 shadow-xl hover:shadow-xl rounded-xl gap-4"
					leftIcon={className => <ArrowLeftEndOnRectangle className={`${className} w-7 h-7`} />}
				/>
			</div>
		</div>
	);
};

export default Welcome;
