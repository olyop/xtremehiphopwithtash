import { Plugin } from "vite";

export const VitePluginHtml = (variables: Record<string, string>): Plugin => ({
	name: "html-transform",
	transformIndexHtml: {
		order: "pre",
		handler: (content: string): string =>
			content.replaceAll(/{{ (.*?) }}/g, (match, p1: string) => variables[p1] ?? match),
	},
});
