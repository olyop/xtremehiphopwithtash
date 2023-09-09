package com.xtremehiphopwithtash.book.service.recaptcha;

class ReCaptchaError extends RuntimeException {

	ReCaptchaError(String message) {
		super("Failed to verify reCAPTCHA: " + message);
	}
}
