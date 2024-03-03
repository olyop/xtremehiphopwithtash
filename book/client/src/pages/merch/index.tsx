import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { FC, Fragment, createElement } from "react";

import { GetMerchItemsQuery, MerchItem as MerchItemType } from "../../generated-types";
import PageWithHeaderAndData from "../page-with-header-and-data";
import GET_MERCH_ITEMS from "./get-merch-items.graphql";
import MerchItem from "./merch-item";

const MerchPage: FC = () => {
	const result = useQuery<GetMerchItemsQuery>(GET_MERCH_ITEMS);
	return (
		<PageWithHeaderAndData
			title="Merch"
			queryResult={result}
			titleClassName="uppercase"
			contentClassName="flex items-center gap-10 px-8 flex-col"
		>
			{({ getMerchItems }) => (
				<Fragment>
					{getMerchItems.map(merchItem => (
						<MerchItem key={merchItem.merchItemID} merchItem={merchItem as MerchItemType} />
					))}
				</Fragment>
			)}
		</PageWithHeaderAndData>
	);
};

export default MerchPage;
