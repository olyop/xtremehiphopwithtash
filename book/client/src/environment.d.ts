/// <reference types="vite/client" />

type TrueOrFalse = "true" | "false";

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: TrueOrFalse;
	readonly VITE_REACT_STRICT_MODE: string;
	readonly VITE_GOOGLE_RECAPTCHA_ACTION: string;
	readonly VITE_GOOGLE_RECAPTCHA_SITE_KEY: string;
	readonly VITE_GOOGLE_MAPS_API_KEY: string;
	readonly VITE_AUTH0_DOMAIN: string;
	readonly VITE_AUTH0_SCOPE: string;
	readonly VITE_AUTH0_CLIENT_ID: string;
	readonly VITE_AUTH0_API_AUDIENCE: string;
	readonly VITE_STRIPE_PAYMENT_DASHBOARD_URL: string;
	readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Navigator extends Navigator {
	standalone?: boolean;
}
