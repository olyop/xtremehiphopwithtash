import { FC, createElement } from "react";

import Loading from "../../components/loading";

const PaymentLoading: FC = () => (
	<div className="p-4 flex flex-col gap-6 items-center justify-center h-full">
		<Loading />
	</div>
);

export default PaymentLoading;
