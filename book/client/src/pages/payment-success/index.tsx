import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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
	const navigate = useNavigate();
	const apollo = useApolloClient();
	const [searchParams] = useSearchParams();

	const [bookingID, setBookingID] = useState<string | false | null>(null);

	const [getPaymentScreenSuccessData, { data }] = useLazyQuery<QueryData, QueryVars>(GET_PAYMENT_SUCCESS_SCREEN);

	const [confirmBooking] = useMutation<MutationData, MutationVars>(CONFIRM_BOOKING, {
		refetchQueries: [{ query: GET_BOOKINGS_PAGE }, { query: GET_ACCOUNT_PAGE }],
	});

	const bookingIDParam = searchParams.get("bookingID");

	const handleWaitForBooking = async () => {
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

	const handleFinish = () => {
		navigate("/bookings");
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
		<main className="flex h-full flex-col items-center justify-center gap-12 p-4">
			{bookingID === null ? (
				<Loading />
			) : bookingID === false ? (
				<p>Booking not found</p>
			) : (
				<Fragment>
					<div className="flex flex-col items-center gap-4">
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
							className="!h-48 !min-w-[16rem] !shadow-xl"
							imageClassName="!h-28"
							disableLink
							showDate
						/>
					)}
					<Link to="/">
						<Button
							text="Finish"
							ariaLabel="Finish"
							onClick={handleFinish}
							className="!hover:shadow-3xl !h-14 gap-4 rounded-xl pr-6 !shadow-2xl"
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
