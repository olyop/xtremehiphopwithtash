import { Plugin } from "vite";

const transform: Plugin["transform"] = (source: string, id: string) => {
	if (id.endsWith(".graphql")) {
		return {
			map: null,
			code: `import gql from 'graphql-tag';export default gql(${JSON.stringify(source)});`,
		};
	} else {
		return null;
	}
};

export const VitePluginGraphql = (): Plugin => ({
	name: "vite-plugin-gql",
	transform,
});
