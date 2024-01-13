import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import { FC, Fragment, createElement } from "react";

import Modal from "../../components/modal";
import { MerchItem as MerchItemType } from "../../generated-types";
import { currencyDollarsFormatter } from "../../helpers/intl";
import { useModal } from "../../hooks";
import { centsToDollars } from "../../utils";

const MerchItem: FC<Props> = ({ merchItem }) => {
	const [isOpen, openModal, closeModal] = useModal();

	const outOfStock = merchItem.stock === 0;

	return (
		<Fragment>
			<button
				type="button"
				disabled={outOfStock}
				data-id={merchItem.merchItemID}
				onClick={outOfStock ? undefined : openModal}
				className={`max-w-[30rem] border cursor-pointer rounded-lg select-none ${
					outOfStock ? "bg-gray-100 opacity-75" : "hover:shadow-lg transition-shadow"
				}`}
			>
				<p
					className={`rounded-t-lg shadow uppercase text-sm font-bold text-white p-0.5 whitespace-nowrap select-none ${
						outOfStock ? "bg-red-500" : "bg-green-500"
					}`}
				>
					{outOfStock ? "Out of stock" : "In stock"}
				</p>
				<img src={merchItem.photo} className="border-b p-2" alt={merchItem.description ?? ""} />
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
						<img src={merchItem.photo} className="border rounded p-4" alt={merchItem.description ?? ""} />
						<div className="flex flex-col gap-2 items-center">
							<p>
								Please email your order quantity and size to
								<Fragment> </Fragment>
								<a href="mailto:natashaperkett@gmail.com" className="text-blue-500 hover:underline hover:text-blue-700">
									natashaperkett@gmail.com
								</a>
							</p>
						</div>
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
