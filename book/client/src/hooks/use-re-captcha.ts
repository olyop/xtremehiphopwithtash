import { useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const action = import.meta.env.VITE_GOOGLE_RECAPTCHA_ACTION;

export const useReCaptcha = () => {
	const isLoadingRef = useRef(false);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [reCaptchaToken, setReCaptchaToken] = useState<ReCaptchaToken>(null);

	const executeReCaptcha = async (): Promise<ReCaptchaToken> => {
		if (executeRecaptcha) {
			if (isLoadingRef.current) {
				return reCaptchaToken;
			} else {
				try {
					isLoadingRef.current = true;
					return await executeRecaptcha(action);
				} catch {
					return null;
				} finally {
					isLoadingRef.current = false;
				}
			}
		} else {
			return null;
		}
	};

	return [reCaptchaToken, setReCaptchaToken, executeReCaptcha] as const;
};

type ReCaptchaToken = string | null;
