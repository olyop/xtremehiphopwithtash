import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import { FC, createElement, useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSearchParams } from "react-router-dom";

import Button from "../../components/button";
import FormError from "../../components/form-error";
import Input, { InputOnChange, InputType } from "../../components/input";
import {
	BookingInput,
	CreateBookingFreeMutation,
	CreateBookingFreeMutationVariables,
	CreateBookingReferralCodeMutation,
	CreateBookingReferralCodeMutationVariables,
	GetPaymentScreenSessionQuery,
	GetPaymentScreenSessionQueryVariables,
	Session,
} from "../../generated-types";
import { useHasMounted } from "../../hooks";
import PaymentConfirmation from "./confirmation";
import CREATE_BOOKING_FREE from "./create-booking-free.graphql";
import CREATE_BOOKING_COUPON from "./create-booking-referral-code.graphql";
import GET_PAYMENT_SCREEN from "./get-payment-screen-session.graphql";
import PaymentOverview from "./overview";
import PaymentLoading from "./payment-loading";
import PaymentMethodForm from "./payment-method-form";
import { PaymentMethod } from "./types";
import { verifyBooleanParamater } from "./verify-boolean-paramater";
import { verifyReferralCode } from "./verify-referral-code";

const PaymentPage: FC = () => {
	const apollo = useApolloClient();
	const hasMounted = useHasMounted();
	const { isAuthenticated, user } = useAuth0();
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [searchParams, setSearchParams] = useSearchParams();

	const [hasPaid, setHasPaid] = useState(false);
	const [isPaying, setIsPaying] = useState(false);
	const [referralCode, setReferralCode] = useState("");
	const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.UNCHOSEN);
	const [bookingInput, setBookingInput] = useState<BookingInput | null>(null);
	const [isReferralCodeValid, setIsReferralCodeValid] = useState<boolean | null>(null);
	const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);

	const [getSession, sessionResult] = useLazyQuery<SessionData, SessionVars>(GET_PAYMENT_SCREEN);
	const [bookFree, bookFreeResult] = useMutation<FreeData, FreeVars>(CREATE_BOOKING_FREE);
	const [bookCoupon, bookCouponResult] = useMutation<CouponData, CouponVars>(CREATE_BOOKING_COUPON);

	useEffect(() => {
		if (!hasMounted) {
			const sessionIDParam = searchParams.get("sessionID");
			const notesParam = searchParams.get("notes");
			const isBringingOwnEquipmentParam = searchParams.get("isBringingOwnEquipment");

			if (
				sessionIDParam &&
				isBringingOwnEquipmentParam &&
				verifyBooleanParamater(isBringingOwnEquipmentParam)
			) {
				setBookingInput({
					sessionID: sessionIDParam,
					notes: notesParam,
					isBringingOwnEquipment: isBringingOwnEquipmentParam === "true",
				});

				void getSession({
					variables: {
						sessionID: sessionIDParam,
					},
				});
			}
		}
	}, []);

	const handleReferralCodeChange: InputOnChange = value => {
		if (typeof value === "string") {
			setReferralCode(value);
		}
	};

	const handleVerifyCoupon = async () => {
		setIsReferralCodeValid(await verifyReferralCode(apollo)(referralCode));
	};

	const handleReCaptchaVerify = useCallback(async () => {
		if (executeRecaptcha) {
			const token = await executeRecaptcha("book");
			setReCaptchaToken(token);
		}
	}, [executeRecaptcha]);

	useEffect(() => {
		if (reCaptchaToken === null) {
			void handleReCaptchaVerify();
		}
	}, []);

	useEffect(() => {
		if (hasMounted && referralCode.length > 0) {
			void handleVerifyCoupon();
		}
	}, [referralCode]);

	useEffect(() => {
		if (isReferralCodeValid) {
			setSearchParams(prevSearchParams => {
				prevSearchParams.append("referralCode", referralCode);
				return prevSearchParams;
			});
		} else {
			setSearchParams(prevSearchParams => {
				prevSearchParams.delete("referralCode");
				return prevSearchParams;
			});
		}
	}, [isReferralCodeValid]);

	useEffect(() => {
		if (bookFreeResult.data?.createBookingFree.bookingID) {
			setIsPaying(true);
		}
	}, [bookFreeResult]);

	useEffect(() => {
		if (bookCouponResult.data?.createBookingReferralCode.bookingID) {
			setIsPaying(true);
		}
	}, [bookCouponResult]);

	useEffect(() => {
		if (isPaying) {
			setTimeout(() => {
				setHasPaid(true);
				setIsPaying(false);
			}, 1500);
		}
	}, [isPaying]);

	if (bookingInput === null) {
		return <PaymentLoading />;
	}

	if (!sessionResult.data?.getSessionByID) {
		return <PaymentLoading />;
	}

	const { sessionID, notes, isBringingOwnEquipment } = bookingInput;
	const session = sessionResult.data.getSessionByID;

	if (hasPaid) {
		return <PaymentConfirmation session={session as Session} />;
	}

	if (isPaying) {
		return <PaymentLoading />;
	}

	const handleCouponSubmit = () => {
		if (user?.sub) {
			void bookCoupon({
				variables: {
					input: bookingInput,
					studentID: user.sub,
					code: referralCode,
				},
			});
		}
	};

	const handleFreeSubmit = () => {
		if (user?.sub) {
			void bookFree({
				variables: {
					input: bookingInput,
					studentID: user.sub,
				},
			});
		}
	};

	const calculatedPrice = isBringingOwnEquipment
		? session.price ?? 0
		: (session.price ?? 0) + (session.equipmentFee ?? 0);

	const price = calculatedPrice === 0 ? null : calculatedPrice;

	const handleSubmit = () => {
		if (isAuthenticated && sessionID && sessionResult) {
			if (price) {
				if (paymentMethod === PaymentMethod.COUPON) {
					handleCouponSubmit();
				}
			} else {
				handleFreeSubmit();
			}
		}
	};

	const disableBookingButton =
		reCaptchaToken === null
			? true
			: price === null
			? false
			: paymentMethod === PaymentMethod.UNCHOSEN ||
			  (paymentMethod === PaymentMethod.COUPON && !isReferralCodeValid);

	return (
		<div className="h-full flex flex-col gap-12 justify-between">
			<div className="flex flex-col gap-8">
				<PaymentOverview
					notes={notes}
					price={price}
					session={session as Session}
					isBringingOwnEquipment={isBringingOwnEquipment}
				/>
				<div className="flex flex-col gap-8 p-4">
					{price && <PaymentMethodForm onChange={setPaymentMethod} paymentMethod={paymentMethod} />}
					{paymentMethod === PaymentMethod.COUPON ? (
						<Input
							id="referralCode"
							name="Code"
							type={InputType.TEXT}
							value={referralCode}
							maxLength={9}
							autoComplete="off"
							onChange={handleReferralCodeChange}
							placeHolder="Enter Here"
							note={
								referralCode.length === 0 ? undefined : isReferralCodeValid ? (
									<span className="text-green-500">Valid</span>
								) : (
									<span className="text-red-500">Invalid</span>
								)
							}
						/>
					) : null}
				</div>
			</div>
			<div className="flex flex-col gap-4 border-t p-4">
				<FormError error={bookFreeResult.error || bookCouponResult.error} />
				<Button
					text="Book Session"
					ariaLabel="Book Session"
					textClassName="!text-xl"
					onClick={handleSubmit}
					disabled={disableBookingButton}
					className="!h-14 shadow-xl hover:shadow-xl rounded-xl"
					leftIcon={className => <CalendarIcon className={`${className} h-7 w-7`} />}
				/>
			</div>
		</div>
	);
};

type SessionData = GetPaymentScreenSessionQuery;
type SessionVars = GetPaymentScreenSessionQueryVariables;
type CouponData = CreateBookingReferralCodeMutation;
type CouponVars = CreateBookingReferralCodeMutationVariables;
type FreeData = CreateBookingFreeMutation;
type FreeVars = CreateBookingFreeMutationVariables;

export default PaymentPage;
