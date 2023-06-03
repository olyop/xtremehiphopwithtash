import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import { PaymentElement } from "@stripe/react-stripe-js";
import { FC, createElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "../../components/button";
import FormError from "../../components/form-error";
import {
	BookingCost,
	BookingInput,
	CreateBookingMutation,
	CreateBookingMutationVariables,
	GetPaymentScreenSessionQuery,
	GetPaymentScreenSessionQueryVariables,
	GetStripeCheckoutUrlQuery,
	PaymentMethod,
	Session,
} from "../../generated-types";
import { useGetReCaptchaToken, useHasMounted } from "../../hooks";
import Page from "../page";
import PaymentConfirmation from "./confirmation";
import PaymentCoupon from "./coupon";
import CREATE_BOOKING from "./create-booking.graphql";
import GET_PAYMENT_SCREEN from "./get-payment-screen-session.graphql";
import GET_STRIPE_CHECKOUT_URL from "./get-stripe-checkout-url.graphql";
import PaymentOverview from "./overview";
import PaymentLoading from "./payment-loading";
import PaymentMethodForm from "./payment-method-form";
import { verifyIntegerParamater } from "./search-paramaters";

const PaymentPage: FC = () => {
	const apollo = useApolloClient();
	const hasMounted = useHasMounted();
	const { isAuthenticated, user } = useAuth0();
	const reCaptchaToken = useGetReCaptchaToken();
	const [searchParams, setSearchParams] = useSearchParams();

	const [hasPaid, setHasPaid] = useState(false);
	const [isPaying, setIsPaying] = useState(false);

	const [session, setSession] = useState<Session | null>(null);
	const [bookingCost, setBookingCost] = useState<BookingCost | null>(null);
	const [bookingInput, setBookingInput] = useState<BookingInput | null>(null);

	const [createBooking, createBookingResult] = useMutation<CreateData, CreateVars>(CREATE_BOOKING);

	const [getCheckoutURL, getCheckoutURLResult] =
		useLazyQuery<CheckoutURLData>(GET_STRIPE_CHECKOUT_URL);

	const reftechPageData = async (input: BookingInput) => {
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

	useEffect(() => {
		if (!hasMounted) {
			const sessionIDParam = searchParams.get("sessionID");
			const notesParam = searchParams.get("notes");
			const couponParam = searchParams.get("coupon");
			const bookingQuantityParam = searchParams.get("bookingQuantity");
			const equipmentQuantityParam = searchParams.get("equipmentQuantity");

			if (
				sessionIDParam &&
				bookingQuantityParam &&
				verifyIntegerParamater(bookingQuantityParam) &&
				(equipmentQuantityParam ? verifyIntegerParamater(equipmentQuantityParam) : true)
			) {
				const input: BookingInput = {
					sessionID: sessionIDParam,
					notes: notesParam,
					bookingQuantity: Number.parseInt(bookingQuantityParam),
					equipmentQuantity: equipmentQuantityParam
						? Number.parseInt(equipmentQuantityParam)
						: null,
					couponCode: couponParam,
					paymentMethod: null,
				};

				void reftechPageData(input);
			}
		}
	}, []);

	useEffect(() => {
		if (bookingInput) {
			void reftechPageData(bookingInput);
		}
	}, [bookingInput?.couponCode, bookingInput?.paymentMethod]);

	useEffect(() => {
		if (hasMounted) {
			setSearchParams(prevSearchParams => {
				if (bookingInput?.paymentMethod) {
					if (prevSearchParams.has("paymentMethod")) {
						prevSearchParams.set("paymentMethod", bookingInput?.paymentMethod);
					} else {
						prevSearchParams.append("paymentMethod", bookingInput?.paymentMethod);
					}
				} else {
					prevSearchParams.delete("paymentMethod");
				}

				return prevSearchParams;
			});
		}
	}, [bookingInput?.paymentMethod]);

	const handleApplyCoupon = (coupon: string) => {
		setBookingInput(prevState => {
			if (prevState === null) {
				return null;
			} else {
				return {
					...prevState,
					couponCode: coupon,
				};
			}
		});
	};

	const handleSubmit = () => {
		if (bookingInput && user?.sub) {
			setIsPaying(true);

			void createBooking({
				variables: {
					input: bookingInput,
				},
			});
		}
	};

	useEffect(() => {
		if (createBookingResult.data) {
			setTimeout(() => {
				setIsPaying(false);
				setHasPaid(true);
			}, 1500);
		}
	}, [createBookingResult.data]);

	useEffect(() => {
		if (createBookingResult.error) {
			setIsPaying(false);
			setHasPaid(false);
		}
	}, [createBookingResult.error]);

	useEffect(() => {
		if (getCheckoutURLResult.data) {
			window.location.href = getCheckoutURLResult.data.getStripeCheckoutURL;
		}
	}, [getCheckoutURLResult]);

	if (!isAuthenticated) {
		return <PaymentLoading />;
	}

	if (bookingInput === null) {
		return <PaymentLoading />;
	}

	if (session === null) {
		return <PaymentLoading />;
	}

	if (bookingCost === null) {
		return <PaymentLoading />;
	}

	if (isPaying) {
		return <PaymentLoading />;
	}

	if (hasPaid) {
		return <PaymentConfirmation session={session} />;
	}

	const canBook =
		reCaptchaToken !== null &&
		isAuthenticated &&
		user?.sub !== null &&
		(bookingInput.paymentMethod === PaymentMethod.CASH ||
			(bookingInput.paymentMethod === null && bookingCost.finalCost === 0));

	return (
		<Page className="h-full flex flex-col gap-12 justify-between !pb-0">
			<div className="flex flex-col gap-6">
				<PaymentOverview session={session} input={bookingInput} bookingCost={bookingCost} />
				<div className="flex flex-col gap-8 px-4">
					{bookingCost.fullCost === 0 || (
						<PaymentCoupon bookingInput={bookingInput} onApplyCoupon={handleApplyCoupon} />
					)}
					{bookingCost.finalCost === 0 || (
						<PaymentMethodForm
							setBookingInput={setBookingInput}
							paymentMethod={bookingInput.paymentMethod}
						/>
					)}
					{bookingInput.paymentMethod === PaymentMethod.CARD && <PaymentElement />}
				</div>
			</div>
			<div className="flex flex-col gap-4 border-t p-4">
				<FormError error={createBookingResult.error} />
				<Button
					text="Stripe Checkout"
					ariaLabel="Stripe Checkout"
					onClick={() => {
						void getCheckoutURL();
					}}
				/>
				<Button
					text="Book Session"
					ariaLabel="Book Session"
					textClassName="!text-xl"
					onClick={handleSubmit}
					disabled={!canBook}
					className="!h-14 shadow-xl hover:shadow-xl rounded-xl"
					leftIcon={className => <CalendarIcon className={`${className} h-7 w-7`} />}
				/>
			</div>
		</Page>
	);
};

type PageData = GetPaymentScreenSessionQuery;
type PageVars = GetPaymentScreenSessionQueryVariables;
type CreateData = CreateBookingMutation;
type CreateVars = CreateBookingMutationVariables;
type CheckoutURLData = GetStripeCheckoutUrlQuery;

export default PaymentPage;
