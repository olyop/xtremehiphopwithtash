import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { FC, createElement, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Button from "../../components/button";
import GET_PAYMENT_SUCCESS_SCREEN from "./get-payment-success-data.graphql";
import { useLazyQuery } from "@apollo/client";
import { GetPaymentSuccessDataQuery, GetPaymentSuccessDataQueryVariables, Session } from "../../generated-types";
import SessionCard from "../../components/session-card";

const PaymentSuccessPage: FC = () => {
	const [searchParams] = useSearchParams();

	const [getPaymentScreenSuccessData, { data }] = useLazyQuery<Data, Vars>(GET_PAYMENT_SUCCESS_SCREEN);

	useEffect(() => {
		const sessionID = searchParams.get("sessionID");

		if (sessionID) {
			getPaymentScreenSuccessData({ variables: { sessionID } });
		}
	}, []);

	return (
		<div className="p-4 flex flex-col gap-12 items-center justify-center h-full">
			<div className="flex flex-col gap-4 items-center">
				<h1 className="text-4xl">Congratulations!</h1>
				<h2 className="text-xl font-bold">You Have Booked</h2>
				<p className="text-center">
					You can view your booking
					<br /> in your account page.
				</p>
			</div>
			{data && (
				<SessionCard
					session={data?.getSessionByID as Session}
					className="!min-w-[16rem] !h-44 !shadow-xl"
					imageClassName="!h-24"
					disableLink
					showDate
				/>
			)}
			<Link to="/">
				<Button
					text="Finish"
					ariaLabel="Finish"
					className="!h-14 !shadow-2xl !hover:shadow-3xl rounded-xl gap-4"
					leftIcon={className => <CheckIcon className={`${className} h-7 w-7`} />}
				/>
			</Link>
		</div>
	);
};

type Data = GetPaymentSuccessDataQuery;
type Vars = GetPaymentSuccessDataQueryVariables;

export default PaymentSuccessPage;
