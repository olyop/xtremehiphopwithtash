import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { FC, createElement } from "react";

import { GetMerchItemsQuery, MerchItem as MerchItemType } from "../../generated-types";
import PageWithHeaderAndData from "../page-with-header-and-data";
import GET_MERCH_ITEMS from "./get-merch-items.graphql";
import MerchItem from "./merch-item";

const MerchPage: FC = () => {
	const result = useQuery<GetMerchItemsQuery>(GET_MERCH_ITEMS);
	return (
		<PageWithHeaderAndData title="Merch" queryResult={result} titleClassName="uppercase">
			{({ getMerchItems }) => (
				<div className="flex flex-col md:flex-row items-center gap-10 px-5">
					{getMerchItems.map(merchItem => (
						<MerchItem key={merchItem.merchItemID} merchItem={merchItem as MerchItemType} />
					))}
				</div>
			)}
		</PageWithHeaderAndData>
	);
};

export default MerchPage;
