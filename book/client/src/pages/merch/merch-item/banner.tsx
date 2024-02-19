import { FC, createElement } from "react";

import { MerchItem as MerchItemType } from "../../../generated-types";

const MerchItemBanner: FC<Props> = ({ merchItem }) => (
	<p
		className={`uppercase text-sm text-white text-center p-1.5 whitespace-nowrap select-none transition-colors ${
			merchItem.isPreOrder
				? "bg-purple-500 group-hover:bg-purple-600 group-focus:bg-purple-600"
				: merchItem.isInStock
				  ? merchItem.isLowStock
						? "bg-orange-500 group-hover:bg-orange-600 group-focus:bg-orange-600"
						: "bg-green-500 group-hover:bg-green-600 group-focus:bg-green-600"
				  : "bg-red-500 group-hover:bg-red-600 group-focus:bg-red-600"
		}`}
	>
		<b>
			{merchItem.isPreOrder
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
	merchItem: MerchItemType;
}

export default MerchItemBanner;
