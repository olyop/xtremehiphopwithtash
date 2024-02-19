import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import { FC, Fragment, createElement } from "react";

import Modal from "../../../components/modal";
import { MerchItem as MerchItemType } from "../../../generated-types";
import { currencyDollarsFormatter } from "../../../helpers/intl";
import { useModal } from "../../../hooks";
import { centsToDollars } from "../../../utils";
import MerchItemBanner from "./banner";

const MerchItem: FC<Props> = ({ merchItem }) => {
	const [isOpen, openModal, closeModal] = useModal();

	return (
		<Fragment>
			<button
				type="button"
				onClick={openModal}
				disabled={!merchItem.isInStock}
				data-id={merchItem.merchItemID}
				className={`max-w-[30rem] group border cursor-pointer rounded-lg select-none overflow-hidden ${
					merchItem.isInStock ? "hover:shadow-lg transition-shadow" : "bg-gray-100 opacity-75"
				}`}
			>
				<MerchItemBanner merchItem={merchItem} />
				<img
					src={merchItem.photo}
					alt={merchItem.description ?? ""}
					className="border-b p-2 group-hover:opacity-80 group-focus:opacity-80"
				/>
				<div className="px-4 py-3 md:px-5 md:py-4 gap-2 flex flex-col">
					<h2 className="text-xl font-bold">{merchItem.name}</h2>
					<p className="text-sm text-gray-500">{merchItem.sizesAvailable?.join(", ") ?? "All Sizes"}</p>
				</div>
				<div className="flex flex-col border-t px-4 py-3 md:px-5 md:py-4">
					<p className="font-bold">{currencyDollarsFormatter.format(centsToDollars(merchItem.price))}</p>
					<p className="text-[0.7rem] text-gray-400">(excl. shipping)</p>
				</div>
			</button>
			<Modal
				isLarge
				isOpen={isOpen}
				onClose={closeModal}
				title={merchItem.name}
				subTitle={
					<Fragment>
						<span>Price: {currencyDollarsFormatter.format(centsToDollars(merchItem.price))} (excl. shipping)</span>
						<br />
						<span>Sizes Available: {merchItem.sizesAvailable?.join(", ") ?? "All Sizes"}</span>
					</Fragment>
				}
				icon={className => <ShoppingBagIcon className={className} />}
				contentClassName="flex flex-col gap-6"
				children={
					<Fragment>
						<div className="border border-t-0 rounded-lg overflow-hidden">
							<MerchItemBanner merchItem={merchItem} />
							<img src={merchItem.photo} alt={merchItem.description ?? ""} className="p-2" />
						</div>
						<p>
							Please email your order quantity and size to
							<Fragment> </Fragment>
							<a href="mailto:natashaperkett@gmail.com" className="text-blue-500 hover:underline hover:text-blue-700">
								natashaperkett@gmail.com
							</a>
						</p>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

interface Props {
	merchItem: MerchItemType;
}

export default MerchItem;
