import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import FormError from "../../components/form-error";
import FullscreenSpinner from "../../components/fullscreen-spinner";
import Loading from "../../components/loading";
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
import { useHasMounted, useReCaptcha } from "../../hooks";
import Page from "../page";
import { isSessionInPast } from "../session/helpers";
import PaymentCoupon from "./coupon";
import CREATE_BOOKING from "./create-booking.graphql";
import GET_PAYMENT_SCREEN from "./get-payment-screen-data.graphql";
import PaymentOverview from "./overview";
import PaymentButton from "./payment-button";
import PaymentMethodForm from "./payment-method-form";
import { mapSearchParamsToBookingInput, syncSearchParams } from "./search-paramaters";
import PaymentPageStripe from "./stripe";

const PaymentPage: FC = () => {
	const navigate = useNavigate();
	const apollo = useApolloClient();
	const hasMounted = useHasMounted();
	const { isAuthenticated, user } = useAuth0();
	const [searchParams, setSearchParams] = useSearchParams();
	const [reCaptchaToken, setReCaptchaToken, executeReCaptcha] = useReCaptcha();

	const [isPaying, setIsPaying] = useState(false);
	const [session, setSession] = useState<Session | null>(null);
	const [bookingCost, setBookingCost] = useState<BookingCost | null>(null);
	const [bookingInput, setBookingInput] = useState<BookingInput | null>(null);

	const [createBooking, createBookingResult] = useMutation<CreateData, CreateVars>(CREATE_BOOKING);

	const refetchPageData = async (input: BookingInput) => {
		const token = await executeReCaptcha();

		const { data } = await apollo.query<PageData, PageVars>({
			query: GET_PAYMENT_SCREEN,
			fetchPolicy: "network-only",
			variables: {
				sessionID: input.sessionID,
				bookingInput: input,
			},
		});

		const { getSessionByID, getBookingCost } = data;

		setBookingCost(getBookingCost);
		setSession(getSessionByID as Session);
		setReCaptchaToken(token);
		setBookingInput({
			...input,
			paymentMethod:
				getBookingCost.cost === 0
					? getBookingCost.isFreeFromCoupon
						? PaymentMethod.COUPON
						: null
					: input.paymentMethod,
		});
	};

	const handleSyncSearchParams = (input: BookingInput) => {
		syncSearchParams("paymentMethod", input.paymentMethod, setSearchParams);
		syncSearchParams("coupon", input.couponCode, setSearchParams);
	};

	useEffect(() => {
		if (hasMounted) {
			if (bookingInput) {
				void refetchPageData(bookingInput);
				handleSyncSearchParams(bookingInput);
			}
		} else {
			const input = mapSearchParamsToBookingInput(searchParams);

			if (input) {
				void refetchPageData(input);
			}
		}
	}, [bookingInput?.couponCode, bookingInput?.paymentMethod]);

	const handleApplyCoupon = (couponCode: string) => {
		setBookingInput(
			prevState =>
				prevState && {
					...prevState,
					couponCode,
				},
		);
	};

	useEffect(() => {
		if (createBookingResult.data) {
			navigate("/payment-success");
		}
	}, [createBookingResult.data]);

	useEffect(() => {
		if (createBookingResult.error) {
			setIsPaying(false);

			if (createBookingResult.error.message.includes("reCAPTCHA")) {
				if (bookingInput) {
					void refetchPageData(bookingInput);
				}

				createBookingResult.reset();
			}
		}
	}, [createBookingResult.error]);

	const showSpinner =
		!isAuthenticated || user === null || bookingInput === null || bookingCost === null || session === null;

	if (showSpinner) {
		return (
			<div className="h-content-height w-full flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	if (session.isCancelled || isSessionInPast(session) || session.capacityRemaining === null) {
		return null;
	}

	const handleCreateBooking = () => {
		setIsPaying(true);

		if (reCaptchaToken) {
			void createBooking({
				variables: {
					input: bookingInput,
					reCaptcha: reCaptchaToken,
				},
			});
		}
	};

	return (
		<Page className="h-full flex flex-col gap-12 pb-16">
			<FullscreenSpinner isLoading={isPaying} />
			<PaymentOverview session={session} input={bookingInput} bookingCost={bookingCost} />
			<div className="flex flex-col gap-12 px-4 pb-52">
				{bookingCost.bookingCost !== 0 && (
					<PaymentCoupon bookingInput={bookingInput} onApplyCoupon={handleApplyCoupon} />
				)}
				{bookingCost.finalCost !== 0 && (
					<PaymentMethodForm setBookingInput={setBookingInput} paymentMethod={bookingInput.paymentMethod} />
				)}
				{bookingInput.paymentMethod === PaymentMethod.CARD && reCaptchaToken ? (
					<PaymentPageStripe bookingInput={bookingInput} setIsPaying={setIsPaying} reCaptcha={reCaptchaToken} />
				) : bookingInput.paymentMethod === PaymentMethod.COUPON ||
				  bookingInput.paymentMethod === PaymentMethod.CASH ||
				  bookingCost.finalCost === 0 ? (
					<Fragment>
						<FormError error={createBookingResult.error} />
						<PaymentButton text="Book Now" onClick={handleCreateBooking} disabled={reCaptchaToken === null} />
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
