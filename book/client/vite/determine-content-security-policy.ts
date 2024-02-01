import contentSecurityPolicyBuilder from "content-security-policy-builder";

export const determineContentSecurityPolicy = (mode: string) => {
	const isProduction = mode === "production";
	const isTesting = mode === "testing";
	const isDevelopment = mode === "development";

	return contentSecurityPolicyBuilder({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: [
				"'self'",
				"https://*.stripe.com",
				"https://*.google.com",
				"https://*.gstatic.com",
				"https://*.googleapis.com",
				isDevelopment ? "'unsafe-inline'" : "",
			],
			styleSrc: ["'self'", isDevelopment ? "'unsafe-inline'" : "", " https://*.googleapis.com"],
			objectSrc: ["'none'"],
			connectSrc: [
				"'self'",
				"https://*.stripe.com",
				"https://*.googleapis.com",
				isProduction
					? "https://api.xtremehiphopwithtash.com"
					: isTesting
					  ? "https://api.development.xtremehiphopwithtash.com"
					  : "http://localhost:8080",
				isProduction ? "https://xtremehiphopwithtash.au.auth0.com" : "https://xtremehiphopwithtash-dev.au.auth0.com",
			],
			fontSrc: ["'self'", "https://*.gstatic.com"],
			frameSrc: [
				"'self'",
				"data:",
				"https://*.googleapis.com",
				"https://*.gstatic.com",
				"https://*.google.com",
				"https://*.gstatic.com",
				"https://*.stripe.com",
			],
			imgSrc: [
				"'self'",
				"data:",
				"https://*.googleapis.com",
				"https://*.gstatic.com",
				"https://*.google.com",
				"https://*.gstatic.com",
				"https://*.googleusercontent.com",
				isProduction ? "https://xtremehiphopwithtash.com" : "https://development.xtremehiphopwithtash.com",
			],
			manifestSrc: ["'self'"],
			mediaSrc: ["'none'"],
			workerSrc: ["'self'"],
		},
	});
};
