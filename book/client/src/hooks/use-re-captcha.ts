import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useReCaptcha = (action: string) => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
	const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);

	const executeReCaptcha = async () => {
		if (executeRecaptcha) {
			try {
				const token = await executeRecaptcha(action);

				setReCaptchaToken(token);
			} catch (error) {
				setReCaptchaError(error instanceof Error ? error.message : "Unknown error");
				setReCaptchaToken(null);
			}
		}
	};

	const getReCaptchaToken = () => {
		setReCaptchaToken(null);

		void executeReCaptcha();
	};

	return [reCaptchaToken, reCaptchaError, getReCaptchaToken] as const;
};
