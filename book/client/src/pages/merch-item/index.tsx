import { useQuery } from "@apollo/client";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import { FC, Fragment, createElement } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/button";
import MerchItemBanner from "../../components/merch-item-banner";
import Modal from "../../components/modal";
import { GetMerchItemByIdQuery, GetMerchItemByIdQueryVariables, MerchItem } from "../../generated-types";
import { currencyDollarsFormatter } from "../../helpers/intl";
import { useModal } from "../../hooks";
import { centsToDollars } from "../../utils";
import PageWithHeaderAndData from "../page-with-header-and-data";
import GET_MERCH_ITEM_BY_ID from "./get-merch-item-by-id.graphql";

const MerchItemPage: FC = () => {
	const { merchItemID } = useParams<Pick<MerchItem, "merchItemID">>();

	const [isBuyModalOpen, openBuyModal, closeBuyModal] = useModal();
	const [isImageModalOpen, openImageModal, closeImageModal] = useModal();

	const result = useQuery<GetMerchItemByIdQuery, GetMerchItemByIdQueryVariables>(GET_MERCH_ITEM_BY_ID, {
		skip: !merchItemID,
		variables: {
			merchItemID: merchItemID ?? "",
		},
	});

	return (
		<PageWithHeaderAndData
			title="Merch"
			queryResult={result}
			className="text-center"
			titleClassName="uppercase"
			contentClassName="flex flex-col items-center gap-16 px-8"
		>
			{({ getMerchItemByID }) => (
				<Fragment>
					<button
						type="button"
						onClick={openImageModal}
						className="cursor-pointer select-none overflow-hidden rounded-lg border text-center shadow-xl transition-shadow hover:shadow-2xl"
					>
						<MerchItemBanner merchItem={getMerchItemByID} />
						<img
							aria-hidden
							src={getMerchItemByID.photo}
							alt={getMerchItemByID.name}
							className="cursor-pointer border-b p-2 transition-opacity"
						/>
						<h1 className="px-4 py-3 text-2xl sm:text-3xl md:px-5 md:py-4">
							<b>{getMerchItemByID.name}</b>
						</h1>
					</button>
					<Modal
						isOpen={isImageModalOpen}
						onClose={closeImageModal}
						title={getMerchItemByID.name}
						modalClassName="sm:!w-[calc(100vw_-_10rem)]"
						contentClassName="pt-16"
					>
						<img src={getMerchItemByID.photo} alt={getMerchItemByID.name} className="w-full" />
					</Modal>
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-2">
							<p className="text-2xl">
								<b>Sizes Available</b>
							</p>
							<p className="text-gray-500">{getMerchItemByID.sizesAvailable?.join(", ") ?? "All Sizes"}</p>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-2xl font-bold">
								{currencyDollarsFormatter.format(centsToDollars(getMerchItemByID.price))}
							</p>
							<p className="text-gray-400">(excl. shipping)</p>
						</div>
					</div>
					<Button
						text="Buy"
						ariaLabel="Buy"
						onClick={openBuyModal}
						disabled={!getMerchItemByID.isInStock}
						textClassName="!text-xl"
						className="!h-16 gap-4 rounded-xl !px-8 shadow-xl hover:shadow-xl"
						leftIcon={className => <ShoppingBagIcon className={`${className} size-8`} />}
					/>
					<Modal
						isOpen={isBuyModalOpen}
						onClose={closeBuyModal}
						title={`Buy ${getMerchItemByID.name}`}
						contentClassName="text-left"
						icon={className => <ShoppingBagIcon className={className} />}
					>
						<Fragment>
							<p>
								<Fragment>Please email your order quantity and size to: </Fragment>
								<br />
								<a href="mailto:natashaperkett@gmail.com" className="text-blue-500">
									natashaperkett@gmail.com
								</a>
							</p>
						</Fragment>
					</Modal>
				</Fragment>
			)}
		</PageWithHeaderAndData>
	);
};

export default MerchItemPage;
