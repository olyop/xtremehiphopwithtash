import { readFile } from "node:fs/promises";

import react from "@vitejs/plugin-react-swc";
import contentSecurityPolicyBuilder from "content-security-policy-builder";
import { visualizer } from "rollup-plugin-visualizer";
import { Plugin, PluginOption, defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
// @ts-expect-error
import gqlImport from "vite-plugin-simple-gql";

const gql = (gqlImport as unknown as { default: () => PluginOption }).default;

const html = (variables: Record<string, string>): Plugin => ({
	name: "html-transform",
	transformIndexHtml: {
		order: "pre",
		handler: (html: string): string => html.replace(/{{ (.*?) }}/g, (match, p1) => variables[p1] ?? match),
	},
});

const determineContentSecurityPolicy = (mode: string) => {
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
				isProduction ? "" : "'unsafe-inline'",
			],
			styleSrc: ["'self'", isProduction ? "" : "'unsafe-inline'", " https://*.googleapis.com"],
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
				isDevelopment ? "https://development.xtremehiphopwithtash.com" : "",
			],
			manifestSrc: ["'none'"],
			mediaSrc: ["'none'"],
			workerSrc: ["'none'"],
		},
	});
};

export default defineConfig(async ({ mode }) => {
	const environmentVariables = loadEnv(mode, process.cwd(), "");

	process.env = { ...process.env, ...environmentVariables };

	const productionPlugins: PluginOption[] = [
		visualizer({
			open: false,
			gzipSize: true,
		}),
	];

	const commonPlugins: PluginOption[] = [
		react(),
		html({ ...environmentVariables, "VITE_CONTENT_SECURITY_POLICY": determineContentSecurityPolicy(mode) }),
		gql(),
		checker({ typescript: true }),
	];

	return {
		plugins: mode === "production" ? [...commonPlugins, ...productionPlugins] : commonPlugins,
		server: {
			https: {
				cert: await readFile(process.env["TLS_CERT_PATH"]!),
				key: await readFile(process.env["TLS_KEY_PATH"]!),
			},
		},
	};
});
