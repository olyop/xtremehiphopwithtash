import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useReCaptcha = (action: string) => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
	const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);

	const handleReCaptcha = async () => {
		if (executeRecaptcha) {
			let token: string | null = null;

			try {
				token = await executeRecaptcha(action);
			} catch (error) {
				setReCaptchaError(error instanceof Error ? error.message : "Unknown reCAPTCHA error");
			} finally {
				setReCaptchaToken(token);
			}
		}
	};

	const getReCaptchaToken = async () => {
		setReCaptchaToken(null);

		await handleReCaptcha();
	};

	return [reCaptchaToken, reCaptchaError, getReCaptchaToken] as const;
};
