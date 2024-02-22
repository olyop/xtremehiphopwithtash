import { readFile } from "node:fs/promises";

import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { PluginOption, defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";

import { checkerPluginOptions, createHtmlPluginOptions, visualizerPluginOptions } from "./vite/plugin-options";
import { Mode } from "./vite/types";
import { gql } from "./vite/vite-plugin-graphql";

export default defineConfig(async options => {
	const mode = options.mode as Mode;

	const environmentVariables = loadEnv(mode, process.cwd(), "");

	process.env = { ...process.env, ...environmentVariables };

	const basePlugins: PluginOption[] = [
		react(),
		gql(),
		createHtmlPlugin(createHtmlPluginOptions(mode)),
		checker(checkerPluginOptions),
	];

	const productionPlugins: PluginOption[] = [...basePlugins, visualizer(visualizerPluginOptions)];

	return {
		plugins: mode === "production" || mode === "staging" ? productionPlugins : basePlugins,
		define: {
			__DEV__: JSON.stringify(mode === "development"),
			"globalThis.__DEV__": JSON.stringify(mode === "development"),
		},
		build: {
			sourcemap: true,
			chunkSizeWarningLimit: 1000,
			terserOptions: {
				format: {
					comments: false,
				},
			},
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
