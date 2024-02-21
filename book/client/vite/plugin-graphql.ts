import gql from "graphql-tag";
import { Plugin } from "vite";

const createFile = (source: string) => `import gql from 'graphql-tag';
export default (${source});`;

const transform: Plugin["transform"] = (source: string, id: string) => {
	if (id.endsWith(".graphql")) {
		return {
			map: null,
			code: createFile(JSON.stringify(gql(source))),
		};
	} else {
		return null;
	}
};

export const VitePluginGraphql = (): Plugin => ({
	name: "vite-plugin-gql",
	transform,
});
