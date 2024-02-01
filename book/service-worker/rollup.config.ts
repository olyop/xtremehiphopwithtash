import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig([
	{
		input: "./src/index.ts",
		output: {
			file: "../client/public/service-worker.js",
			plugins: [terser()],
			esModule: true,
		},
		plugins: [
			typescript(),
			nodeResolve(),
			replace({
				preventAssignment: true,
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			}),
		],
	},
]);
