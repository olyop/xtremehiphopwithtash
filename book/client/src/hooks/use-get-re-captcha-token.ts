import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useGetReCaptchaToken = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);

	const handleReCaptchaVerify = async () => {
		if (executeRecaptcha) {
			const token = await executeRecaptcha("book");
			setReCaptchaToken(token);
		}
	};

	useEffect(() => {
		if (reCaptchaToken === null) {
			void handleReCaptchaVerify();
		}
	});

	return reCaptchaToken;
};
