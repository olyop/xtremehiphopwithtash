import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
// @ts-ignore
import gql from "vite-plugin-simple-gql";

export default defineConfig({
	plugins: [react(), gql.default()],
	server: {
		proxy: {
			"/graphql": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
		},
	},
});
