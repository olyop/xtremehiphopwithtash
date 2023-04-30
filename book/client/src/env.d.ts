/// <reference types="vite/client" />

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;

	readonly VITE_GOOGLE_RECAPTCHA_SITE_KEY: string;
	readonly VITE_GOOGLE_MAPS_API_KEY: string;

	readonly VITE_AUTH0_REDIRECT_URL: string;
	readonly VITE_AUTH0_DOMAIN: string;
	readonly VITE_AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}