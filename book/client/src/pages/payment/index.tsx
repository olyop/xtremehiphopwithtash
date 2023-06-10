import { useApolloClient, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import FormError from "../../components/form-error";
import {
	BookingCost,
	BookingInput,
	CreateBookingMutation,
	CreateBookingMutationVariables,
	GetPaymentScreenDataQuery,
	GetPaymentScreenDataQueryVariables,
	PaymentMethod,
	Session,
} from "../../generated-types";
import { useGetReCaptchaToken, useHasMounted } from "../../hooks";
import Page from "../page";
import PaymentCoupon from "./coupon";
import CREATE_BOOKING from "./create-booking.graphql";
import GET_PAYMENT_SCREEN from "./get-payment-screen-data.graphql";
import PaymentOverview from "./overview";
import PayingSpinner from "./paying-spinner";
import PaymentButton from "./payment-button";
import PaymentLoading from "./payment-loading";
import PaymentMethodForm from "./payment-method-form";
import { mapSearchParamsToBookingInput, syncSearchParams } from "./search-paramaters";
import PaymentPageStripe from "./stripe";

const PaymentPage: FC = () => {
	const navigate = useNavigate();
	const apollo = useApolloClient();
	const hasMounted = useHasMounted();
	const { isAuthenticated, user } = useAuth0();
	const reCaptchaToken = useGetReCaptchaToken();
	const [searchParams, setSearchParams] = useSearchParams();

	const [isPaying, setIsPaying] = useState(false);

	const [session, setSession] = useState<Session | null>(null);
	const [bookingCost, setBookingCost] = useState<BookingCost | null>(null);
	const [bookingInput, setBookingInput] = useState<BookingInput | null>(null);

	const [createBooking, createBookingResult] = useMutation<CreateData, CreateVars>(CREATE_BOOKING);

	const refetchPageData = async (input: BookingInput) => {
		const { data } = await apollo.query<PageData, PageVars>({
			query: GET_PAYMENT_SCREEN,
			variables: {
				sessionID: input.sessionID,
				bookingInput: input,
			},
		});

		const { getSessionByID, getBookingCost } = data;

		setBookingCost(getBookingCost);
		setSession(getSessionByID as Session);

		setBookingInput({
			...input,
			paymentMethod: getBookingCost.finalCost === 0 ? null : input.paymentMethod,
		});
	};

	const handleSyncSearchParams = (input: BookingInput) => {
		syncSearchParams("paymentMethod", input.paymentMethod, setSearchParams);
		syncSearchParams("coupon", input.couponCode, setSearchParams);
	};

	useEffect(() => {
		if (!hasMounted) {
			const input = mapSearchParamsToBookingInput(searchParams);

			if (input) {
				void refetchPageData(input);
			}
		}
	}, []);

	useEffect(() => {
		if (hasMounted && bookingInput) {
			void refetchPageData(bookingInput);
			handleSyncSearchParams(bookingInput);
		}
	}, [bookingInput?.couponCode, bookingInput?.paymentMethod]);

	const handleApplyCoupon = (couponCode: string) => {
		setBookingInput(
			prevState =>
				prevState && {
					...prevState,
					couponCode: couponCode,
				},
		);
	};

	useEffect(() => {
		if (createBookingResult.data) {
			setTimeout(() => {
				navigate("/payment-success");
			}, 1500);
		}
	}, [createBookingResult.data]);

	useEffect(() => {
		if (createBookingResult.error) {
			setIsPaying(false);
		}
	}, [createBookingResult.error]);

	const showSpinner =
		!isAuthenticated ||
		user === null ||
		bookingInput === null ||
		bookingCost === null ||
		session === null;

	if (showSpinner) {
		return <PaymentLoading />;
	}

	const handleCreateBooking = () => {
		setIsPaying(true);

		void createBooking({
			variables: {
				input: bookingInput,
			},
		});
	};

	return (
		<Page className="h-full flex flex-col gap-12 pb-16">
			<PayingSpinner isPaying={isPaying} />
			<PaymentOverview session={session} input={bookingInput} bookingCost={bookingCost} />
			<div className="flex flex-col gap-12 px-4 pb-52">
				{bookingCost.fullCost === 0 || (
					<PaymentCoupon bookingInput={bookingInput} onApplyCoupon={handleApplyCoupon} />
				)}
				{bookingCost.finalCost === 0 || (
					<PaymentMethodForm
						setBookingInput={setBookingInput}
						paymentMethod={bookingInput.paymentMethod}
					/>
				)}
				{bookingInput.paymentMethod === PaymentMethod.CARD ? (
					<PaymentPageStripe bookingInput={bookingInput} setIsPaying={setIsPaying} />
				) : bookingCost.finalCost === 0 || bookingInput.paymentMethod === PaymentMethod.CASH ? (
					<Fragment>
						<FormError error={createBookingResult.error} />
						<PaymentButton
							text="Book Now"
							onClick={handleCreateBooking}
							disabled={reCaptchaToken === null}
						/>
					</Fragment>
				) : null}
			</div>
		</Page>
	);
};

type PageData = GetPaymentScreenDataQuery;
type PageVars = GetPaymentScreenDataQueryVariables;

type CreateData = CreateBookingMutation;
type CreateVars = CreateBookingMutationVariables;

export default PaymentPage;
