import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
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
	const [isReCaptchaError, setIsReCaptchaError] = useState(false);
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
		setIsReCaptchaError(false);
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
		setIsReCaptchaError(true);
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
		if (createBookingResult.error) {
			setIsPaying(false);

			if (createBookingResult.error.message.includes("reCAPTCHA")) {
				handleReCaptchaError();
			}
		}
	}, [createBookingResult.error]);

	if (bookingInput === null || bookingCost === null || session === null) {
		return (
			<div className="h-content-height w-full flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	if (!canBookSession) {
		return (
			<div className="h-content-height w-full flex items-center justify-center">
				<FormError error="This session is no longer available." />
			</div>
		);
	}

	return (
		<Page className="h-full flex flex-col gap-12 pb-16">
			<FullscreenSpinner isLoading={isPaying} />
			<PaymentOverview session={session} input={bookingInput} bookingCost={bookingCost} />
			<EquipmentHireWarning
				bookingInput={bookingInput}
				onUpdateEquipmentHire={handleUpdateEquipmentQuantity}
				session={session}
			/>
			<div className="flex flex-col gap-12 px-4 pb-52">
				{bookingCost.bookingCost !== 0 && (
					<PaymentCoupon bookingInput={bookingInput} onApplyCoupon={handleApplyCoupon} />
				)}
				{bookingCost.finalCost !== 0 && (
					<PaymentMethodForm setBookingInput={setBookingInput} paymentMethod={bookingInput.paymentMethod} />
				)}
				{bookingInput.paymentMethod === PaymentMethod.CARD && reCaptchaToken ? (
					<PaymentPageStripe
						bookingInput={bookingInput}
						onSubmit={handleSubmitting}
						onSubmitted={handleSubmitted}
						reCaptchaToken={reCaptchaToken}
						isFetchingPageData={isFetchingPageData}
					/>
				) : bookingInput.paymentMethod === PaymentMethod.COUPON ||
				  bookingInput.paymentMethod === PaymentMethod.CASH ||
				  bookingCost.finalCost === 0 ? (
					<Fragment>
						<FormError error={createBookingResult.error} />
						<PaymentButton
							onClick={handleCreateBooking}
							text={reCaptchaError ?? "Book Now"}
							disabled={isFetchingPageData || reCaptchaToken === null}
						/>
					</Fragment>
				) : null}
				{isReCaptchaError && <FormError error="Timeout, please try again." />}
			</div>
		</Page>
	);
};

type PageData = GetPaymentScreenDataQuery;
type PageVars = GetPaymentScreenDataQueryVariables;

type CreateData = CreateBookingMutation;
type CreateVars = CreateBookingMutationVariables;

export default PaymentPage;
