import { readFile } from "node:fs/promises";

import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { PluginOption, defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";

import { determineContentSecurityPolicy } from "./vite/determine-content-security-policy";
import { VitePluginGraphql as gql } from "./vite/plugin-graphql";
import { VitePluginHtml as htmlVariables } from "./vite/plugin-html-variables";

const checkerOptions: Parameters<typeof checker>[0] = {
	terminal: false,
	typescript: {
		tsconfigPath: "./tsconfig.json",
	},
	eslint: {
		lintCommand: "eslint './src/**/*.{ts,tsx}' --parser-options='{\"project\": \"./tsconfig.json\"}'",
		dev: {
			overrideConfig: {
				overrideConfig: {
					parserOptions: {
						project: "./tsconfig.json",
					},
				},
			},
		},
	},
};

export default defineConfig(async ({ mode }) => {
	const environmentVariables = loadEnv(mode, process.cwd(), "");

	process.env = { ...process.env, ...environmentVariables };

	const productionPlugins: PluginOption[] = [
		visualizer({
			open: true,
			gzipSize: true,
		}),
	];

	const commonPlugins: PluginOption[] = [
		react(),
		gql(),
		checker(checkerOptions),
		htmlVariables({ "VITE_CONTENT_SECURITY_POLICY": determineContentSecurityPolicy(mode) }),
	];

	return {
		plugins: mode === "production" || mode === "staging" ? [...commonPlugins, ...productionPlugins] : commonPlugins,
		build: {
			target: "",
		},
		server: {
			https:
				mode === "development"
					? {
							cert: await readFile(process.env["TLS_CERT_PATH"]!),
							key: await readFile(process.env["TLS_KEY_PATH"]!),
					  }
					: undefined,
		},
	};
});
