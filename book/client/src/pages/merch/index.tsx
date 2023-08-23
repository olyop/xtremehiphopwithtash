import { createElement, FC } from "react";
import { useQuery } from "@apollo/client/react/hooks/useQuery";

import Page from "../page";
import GET_MERCH_ITEMS from "./get-merch-items.graphql";
import { GetMerchItemsQuery } from "../../generated-types";
import FullscreenSpinner from "../../components/fullscreen-spinner";
import MerchItem from "./merch-item";

const MerchPage: FC = () => {
	const { data, loading } = useQuery<Data>(GET_MERCH_ITEMS);
	return (
		<Page className="p-6 flex flex-col gap-10 pb-56">
			<FullscreenSpinner isLoading={loading} backgroundClassName="!opacity-10" />
			<h1 className="text-3xl pt-2 pb-4 px-8 font-bold text-center md:text-left border-b self-center uppercase">
				Merch
			</h1>
			<div className="flex flex-col md:flex-row items-center gap-10">
				{data && data.getMerchItems.map(merchItem => <MerchItem key={merchItem.merchItemID} merchItem={merchItem} />)}
			</div>
		</Page>
	);
};

type Data = GetMerchItemsQuery;

export default MerchPage;
