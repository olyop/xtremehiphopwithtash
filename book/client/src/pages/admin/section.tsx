import { ReactNode, createElement } from "react";

// eslint-disable-next-line @typescript-eslint/comma-dangle
const Section = <T,>({ title, subTitle, items, renderItem, create }: Props<T>) => (
	<div className="flex flex-col items-start gap-2">
		<div>
			<h2 className="text-2xl">{title}</h2>
			{subTitle && <h3 className="text-sm text-gray-500">{subTitle}</h3>}
		</div>
		<div className="self-stretch bg-white shadow-md">
			{items === undefined ? (
				<p className="p-2 text-gray-500">Loading...</p>
			) : items === null ? (
				<p className="p-2 text-gray-500">None found</p>
			) : (
				items.map(item => renderItem(item))
			)}
		</div>
		{create}
	</div>
);

interface Props<T> {
	title: string;
	subTitle?: string | undefined;
	items: readonly T[] | null | undefined;
	renderItem: (item: T) => ReactNode;
	create?: ReactNode;
}

export default Section;
