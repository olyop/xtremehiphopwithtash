import { useApolloClient, useMutation } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Button from "../../components/button";
import Loading from "../../components/loading";
import SessionCard from "../../components/session-card";
import {
	ConfirmBookingMutation,
	ConfirmBookingMutationVariables,
	GetPaymentSuccessDataQuery,
	GetPaymentSuccessDataQueryVariables,
	Session,
} from "../../generated-types";
import GET_ACCOUNT_PAGE from "../account/get-account-page.graphql";
import GET_BOOKINGS_PAGE from "../bookings/get-bookings-page.graphql";
import CONFIRM_BOOKING from "./confirm-booking.graphql";
import GET_PAYMENT_SUCCESS_SCREEN from "./get-payment-success-data.graphql";
import { waitUntilBookingExists } from "./wait-until-booking-exists";

const PaymentSuccessPage: FC = () => {
	const apollo = useApolloClient();
	const [searchParams, setSearchParams] = useSearchParams();

	const [bookingID, setBookingID] = useState<string | false | null>(null);

	const [getPaymentScreenSuccessData, { data }] = useLazyQuery<QueryData, QueryVars>(GET_PAYMENT_SUCCESS_SCREEN);

	const [confirmBooking] = useMutation<MutationData, MutationVars>(CONFIRM_BOOKING, {
		refetchQueries: [GET_BOOKINGS_PAGE, GET_ACCOUNT_PAGE],
	});

	const bookingIDParam = searchParams.get("bookingID");

	const handleClearSearchParams = () => {
		if (bookingIDParam) {
			const newSearchParams = new URLSearchParams();
			newSearchParams.append("bookingID", bookingIDParam);

			setSearchParams(newSearchParams);
		}
	};

	const handleWaitForBooking = async () => {
		handleClearSearchParams();

		if (bookingIDParam) {
			const bookingExists = await waitUntilBookingExists(apollo)(bookingIDParam);

			if (bookingExists) {
				setBookingID(bookingIDParam);
			} else {
				setBookingID(false);
			}
		} else {
			setBookingID(false);
		}
	};

	const handleBookingFound = async () => {
		if (bookingID) {
			await confirmBooking({ variables: { bookingID } });

			await getPaymentScreenSuccessData({ variables: { bookingID } });
		}
	};

	useEffect(() => {
		void handleWaitForBooking();
	}, []);

	useEffect(() => {
		if (bookingID) {
			void handleBookingFound();
		}
	}, [bookingID]);

	return (
		<main className="p-4 flex flex-col gap-12 items-center justify-center h-full">
			{bookingID === null ? (
				<Loading />
			) : bookingID === false ? (
				<p>Booking not found</p>
			) : (
				<Fragment>
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
							session={data.getBookingByID.session as Session}
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
							className="!h-14 !shadow-2xl !hover:shadow-3xl rounded-xl gap-4 pr-6"
							leftIcon={className => <CheckIcon className={`${className} h-7 w-7`} />}
						/>
					</Link>
				</Fragment>
			)}
		</main>
	);
};

type QueryData = GetPaymentSuccessDataQuery;
type QueryVars = GetPaymentSuccessDataQueryVariables;

type MutationData = ConfirmBookingMutation;
type MutationVars = ConfirmBookingMutationVariables;

export default PaymentSuccessPage;
