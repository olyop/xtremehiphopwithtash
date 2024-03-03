import { FC, createElement } from "react";
import { Link } from "react-router-dom";

import MerchItemBanner from "../../../components/merch-item-banner";
import { MerchItem as MerchItemType } from "../../../generated-types";
import { currencyDollarsFormatter } from "../../../helpers/intl";
import { centsToDollars } from "../../../utils";

const MerchItem: FC<Props> = ({ merchItem }) => (
	<Link
		data-id={merchItem.merchItemID}
		to={`./${merchItem.merchItemID}`}
		className={`group block max-w-[30rem] cursor-pointer select-none overflow-hidden rounded-lg border text-center transition-shadow ${
			merchItem.isInStock ? "hover:shadow-lg focus:shadow-lg" : "bg-gray-100 opacity-75"
		}`}
	>
		<MerchItemBanner merchItem={merchItem} />
		<img src={merchItem.photo} alt={merchItem.description ?? ""} className="border-b p-2" />
		<div className="flex flex-col gap-2 px-4 py-3 md:px-5 md:py-4">
			<h2 className="text-xl font-bold md:overflow-hidden md:whitespace-nowrap">{merchItem.name}</h2>
			<p className="text-sm text-gray-500">{merchItem.sizesAvailable?.join(", ") ?? "All Sizes"}</p>
		</div>
		<div className="flex flex-col border-t px-4 py-3 md:px-5 md:py-4">
			<p className="font-bold">{currencyDollarsFormatter.format(centsToDollars(merchItem.price))}</p>
			<p className="text-[0.7rem] text-gray-400">(excl. shipping)</p>
		</div>
	</Link>
);

interface Props {
	merchItem: MerchItemType;
}

export default MerchItem;
