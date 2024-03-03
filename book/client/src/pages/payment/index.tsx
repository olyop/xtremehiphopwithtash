import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { FC, createElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Error from "../../components/error";
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
import PaymentCoupon from "./coupon";
import CREATE_BOOKING from "./create-booking.graphql";
import { createPaymentSuccessUrl } from "./create-payment-success-url";
import EquipmentHireWarning from "./equipment-hire-warning";
import GET_PAYMENT_SCREEN from "./get-payment-screen-data.graphql";
import PaymentOverview from "./overview";
import PaymentButton from "./payment-button";
import PaymentMethodForm from "./payment-method-form";
import { createSyncSearchParams, mapSearchParamsToBookingInput } from "./search-paramaters";
import PaymentPageStripe from "./stripe";

const PaymentPage: FC = () => {
	const navigate = useNavigate();
	const apollo = useApolloClient();
	const hasMounted = useHasMounted();
	const [searchParams, setSearchParams] = useSearchParams();

	const [reCaptchaToken, reCaptchaError, getReCaptchaToken] = useReCaptcha(
		import.meta.env.VITE_GOOGLE_RECAPTCHA_ACTION,
	);

	const [isPaying, setIsPaying] = useState(false);
	const [showTimeoutError, setShowTimeoutError] = useState(false);
	const [isFetchingPageData, setIsFetchingPageData] = useState(false);

	const [session, setSession] = useState<Session | null>(null);
	const [canBookSession, setCanBookSession] = useState<boolean>(true);
	const [bookingCost, setBookingCost] = useState<BookingCost | null>(null);
	const [bookingInput, setBookingInput] = useState<BookingInput | null>(null);

	const [createBooking, createBookingResult] = useMutation<CreateData, CreateVars>(CREATE_BOOKING);

	const refetchPageData = async (input: BookingInput) => {
		try {
			setIsFetchingPageData(true);

			await getReCaptchaToken();

			const { data } = await apollo.query<PageData, PageVars>({
				query: GET_PAYMENT_SCREEN,
				fetchPolicy: "network-only",
				variables: {
					sessionID: input.sessionID,
					bookingInput: input,
				},
			});

			const { getSessionByID, getBookingCost, getCanBookSession } = data;

			const bookingInputData = {
				...input,
				paymentMethod:
					getBookingCost.cost === 0
						? getBookingCost.isFreeFromCoupon
							? PaymentMethod.COUPON
							: null
						: input.paymentMethod,
			};

			setSession(getSessionByID as Session);
			setCanBookSession(getCanBookSession);
			setBookingCost(getBookingCost);
			setBookingInput(bookingInputData);
		} finally {
			setIsFetchingPageData(false);
		}
	};

	const handleSyncSearchParams = ({ paymentMethod, couponCode, equipmentQuantity }: BookingInput) => {
		const syncSearchParams = createSyncSearchParams(setSearchParams);

		syncSearchParams("paymentMethod", paymentMethod);
		syncSearchParams("coupon", couponCode);
		syncSearchParams("equipmentQuantity", equipmentQuantity);
	};

	const handleApplyCoupon = (couponCode: string) => {
		setBookingInput(
			prevState =>
				prevState && {
					...prevState,
					couponCode,
				},
		);
	};

	const handleUpdateEquipmentQuantity = (equipmentQuantity: number | null) => {
		setBookingInput(
			prevState =>
				prevState && {
					...prevState,
					equipmentQuantity,
				},
		);
	};

	const handleSubmitting = () => {
		setShowTimeoutError(false);
		setIsPaying(true);
	};

	const handleSubmitted = () => {
		setIsPaying(false);
	};

	const handleCreateBooking = () => {
		if (bookingInput && reCaptchaToken) {
			handleSubmitting();

			void createBooking({
				variables: {
					bookingInput,
					reCaptchaToken,
				},
			});
		}
	};

	const handleReCaptchaError = () => {
		void getReCaptchaToken();
		setShowTimeoutError(true);
		createBookingResult.reset();
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
	}, [bookingInput?.couponCode, bookingInput?.paymentMethod, bookingInput?.equipmentQuantity]);

	useEffect(() => {
		if (createBookingResult.data) {
			const successUrl = createPaymentSuccessUrl(createBookingResult.data.createBooking.bookingID);

			navigate({
				pathname: successUrl.pathname,
				search: successUrl.search,
			});
		}
	}, [createBookingResult.data]);

	useEffect(() => {
		if (createBookingResult.error && bookingInput) {
			setIsPaying(false);

			void refetchPageData(bookingInput);

			if (createBookingResult.error.message.includes("reCAPTCHA")) {
				handleReCaptchaError();
			}
		}
	}, [createBookingResult.error]);

	if (bookingInput === null || bookingCost === null || session === null) {
		return (
			<div className="h-content-height flex w-full items-center justify-center">
				<Loading />
			</div>
		);
	}

	const showCoupon = bookingCost.bookingCost !== 0 && canBookSession;
	const showPaymentMethodForm = bookingCost.finalCost !== 0 && canBookSession;
	const showCardForm = bookingInput.paymentMethod === PaymentMethod.CARD && reCaptchaToken !== null && canBookSession;

	const showCashForm =
		canBookSession &&
		(bookingInput.paymentMethod === PaymentMethod.CASH ||
			bookingInput.paymentMethod === PaymentMethod.COUPON ||
			bookingCost.finalCost === 0);

	return (
		<Page className="flex h-full flex-col gap-12 pb-16">
			<PaymentOverview session={session} input={bookingInput} bookingCost={bookingCost} />
			<div className="flex flex-col gap-12 px-4 pb-52">
				{showCoupon && <PaymentCoupon bookingInput={bookingInput} onApplyCoupon={handleApplyCoupon} />}
				{showPaymentMethodForm && (
					<PaymentMethodForm setBookingInput={setBookingInput} paymentMethod={bookingInput.paymentMethod} />
				)}
				{showCardForm ? (
					<PaymentPageStripe
						bookingInput={bookingInput}
						onSubmit={handleSubmitting}
						onSubmitted={handleSubmitted}
						reCaptchaToken={reCaptchaToken}
						isFetchingPageData={isFetchingPageData}
					/>
				) : null}
				{showCashForm ? (
					<PaymentButton
						onClick={handleCreateBooking}
						text={reCaptchaError ?? "Book Now"}
						disabled={isFetchingPageData || reCaptchaToken === null}
					/>
				) : null}
				<FormError error={createBookingResult.error} />
				{showTimeoutError && <Error errors={["Timeout, please try again."]} />}
				{!canBookSession && (
					<Error isBadError errors={["This session is no longer available. Please select another session."]} />
				)}
			</div>
			<FullscreenSpinner isLoading={isPaying} />
			<EquipmentHireWarning
				bookingInput={bookingInput}
				onUpdateEquipmentHire={handleUpdateEquipmentQuantity}
				session={session}
			/>
		</Page>
	);
};

type PageData = GetPaymentScreenDataQuery;
type PageVars = GetPaymentScreenDataQueryVariables;

type CreateData = CreateBookingMutation;
type CreateVars = CreateBookingMutationVariables;

export default PaymentPage;
