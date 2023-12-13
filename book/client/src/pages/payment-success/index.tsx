import { useLazyQuery } from "@apollo/client";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { FC, createElement, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Button from "../../components/button";
import SessionCard from "../../components/session-card";
import { GetPaymentSuccessDataQuery, GetPaymentSuccessDataQueryVariables, Session } from "../../generated-types";
import GET_PAYMENT_SUCCESS_SCREEN from "./get-payment-success-data.graphql";

const PaymentSuccessPage: FC = () => {
	const [searchParams] = useSearchParams();

	const [getPaymentScreenSuccessData, { data }] = useLazyQuery<Data, Vars>(GET_PAYMENT_SUCCESS_SCREEN);

	useEffect(() => {
		const sessionID = searchParams.get("sessionID");

		if (sessionID) {
			void getPaymentScreenSuccessData({ variables: { sessionID } });
		}
	}, []);

	return (
		<main className="p-4 flex flex-col gap-12 items-center justify-center h-full">
			<div className="flex flex-col gap-4 items-center">
				<h1 className="text-4xl">Congratulations!</h1>
				<h2 className="text-xl font-bold">You Have Booked</h2>
				<p className="text-center">
					You can view your booking
					<br /> in the account page.
				</p>
			</div>
			{data && (
				<SessionCard
					session={data.getSessionByID as Session}
					className="!min-w-[16rem] !h-48 !shadow-xl"
					imageClassName="!h-28"
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
		</main>
	);
};

type Data = GetPaymentSuccessDataQuery;
type Vars = GetPaymentSuccessDataQueryVariables;

export default PaymentSuccessPage;
