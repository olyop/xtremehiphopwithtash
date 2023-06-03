import { readFile } from "node:fs/promises";

import react from "@vitejs/plugin-react-swc";
import { PluginOption, defineConfig, loadEnv } from "vite";
// @ts-expect-error
import gqlImport from "vite-plugin-simple-gql";

const gql = (gqlImport as unknown as { default: () => PluginOption }).default;
export default defineConfig(async ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
	return {
		mode: "development",
		plugins: [react(), gql()],
		server: {
			host: true,
			https: {
				cert: await readFile(process.env["TLS_CERT_PATH"]!),
				key: await readFile(process.env["TLS_KEY_PATH"]!),
			},
			proxy: {
				"/graphql": {
					target: "http://localhost:8080",
					changeOrigin: true,
				},
				"/api": {
					target: "http://localhost:8080",
					changeOrigin: true,
				},
			},
		},
	};
});
