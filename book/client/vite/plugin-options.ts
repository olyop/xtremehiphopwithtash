import { PluginVisualizerOptions } from "rollup-plugin-visualizer";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";

import { determineContentSecurityPolicy } from "./determine-content-security-policy";
import { Mode } from "./types";

export const createHtmlPluginOptions = (mode: Mode): Parameters<typeof createHtmlPlugin>[0] => ({
	minify: true,
	entry: "src/index.tsx",
	inject: {
		data: {
			contentSecurityPolicy: determineContentSecurityPolicy(mode),
		},
	},
});

export const checkerPluginOptions: Parameters<typeof checker>[0] = {
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

export const visualizerPluginOptions: PluginVisualizerOptions = {
	open: true,
	gzipSize: true,
	brotliSize: true,
};
