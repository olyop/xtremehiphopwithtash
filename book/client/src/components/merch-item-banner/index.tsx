import { FC, createElement } from "react";

import { MerchItem as MerchItemType } from "../../generated-types";

const MerchItemBanner: FC<Props> = ({ merchItem, className }) => (
	<p
		className={`select-none whitespace-nowrap p-1.5 text-sm uppercase text-white transition-colors ${
			merchItem === null
				? "bg-gray-500"
				: merchItem.isPreOrder
					? "bg-purple-500"
					: merchItem.isInStock
						? merchItem.isLowStock
							? "bg-orange-500"
							: "bg-green-500"
						: "bg-red-500"
		} ${className ?? ""}`}
	>
		<b>
			{merchItem === null
				? "Loading..."
				: merchItem.isPreOrder
					? "Pre-Order"
					: merchItem.isInStock
						? merchItem.isLowStock
							? "Low stock"
							: "In stock"
						: "Out of stock"}
		</b>
	</p>
);

interface Props {
	className?: string;
	merchItem: MerchItemType | null;
}

export default MerchItemBanner;
