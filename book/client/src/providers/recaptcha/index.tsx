import { FC, PropsWithChildren, createElement } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import "./index.css";

const ReCaptchaProvider: FC<PropsWithChildren> = ({ children }) => (
	<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}>
		{children}
	</GoogleReCaptchaProvider>
);

export default ReCaptchaProvider;
