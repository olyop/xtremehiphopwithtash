import { ReactNode, createElement } from "react";

// eslint-disable-next-line @typescript-eslint/comma-dangle
const Section = <T,>({ title, items, renderItem, create }: PropTypes<T>) => (
	<div className="flex flex-col items-start gap-2">
		<h2 className="text-2xl">{title}</h2>
		<div className="self-stretch bg-white shadow-md">
			{items ? (
				items.length === 0 ? (
					<p className="p-2 text-gray-500">None found</p>
				) : (
					items.map(item => renderItem(item))
				)
			) : (
				<p className="p-2 text-gray-500">Loading...</p>
			)}
		</div>
		{create}
	</div>
);

interface PropTypes<T> {
	title: string;
	items: readonly T[] | undefined;
	renderItem: (item: T) => ReactNode;
	create?: ReactNode;
}

export default Section;
