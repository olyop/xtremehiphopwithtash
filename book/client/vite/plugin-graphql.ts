import { Plugin } from "vite";

const getCode = (schema: string) => `import gql from 'graphql-tag';export default gql(${schema});`;

const transform: NonNullable<Plugin["transform"]> = (source: string, id: string) => {
	if (id.endsWith(".graphql")) {
		const schema = JSON.stringify(source);

		return {
			code: getCode(schema),
			map: null,
		};
	} else {
		return null;
	}
};

export const VitePluginGraphql = (): Plugin => ({
	name: "vite-plugin-gql",
	transform,
});
