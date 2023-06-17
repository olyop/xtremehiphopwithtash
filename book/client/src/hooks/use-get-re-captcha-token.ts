import { useRef } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useGetReCaptchaToken = () => {
	const isLoadingRef = useRef(false);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const getReCaptchaToken = async () => {
		if (executeRecaptcha) {
			try {
				isLoadingRef.current = true;
				console.log("executeRecaptcha");
				return await executeRecaptcha("book");
			} catch {
				return null;
			} finally {
				isLoadingRef.current = false;
			}
		} else {
			return null;
		}
	};

	return [getReCaptchaToken, isLoadingRef] as const;
};
