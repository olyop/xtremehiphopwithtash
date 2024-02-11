import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { FC, createElement, useEffect, useRef, useState } from "react";

import Error from "../../../components/error";
import FormError from "../../../components/form-error";
import Loading from "../../../components/loading";
import {
	BookingInput,
	CreatePaymentIntentMutation,
	CreatePaymentIntentMutationVariables,
	PaymentMethod,
} from "../../../generated-types";
import StripeProvider from "../../../providers/stripe";
import CardForm from "./card-form";
import CREATE_PAYMENT_INTENT from "./create-payment-intent.graphql";

const PaymentPageStripe: FC<Props> = ({ isFetchingPageData, reCaptchaToken, bookingInput, onSubmit, onSubmitted }) => {
	const paymentMethodRef = useRef<PaymentMethod | null>(null);

	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [bookingID, setBookingID] = useState<string | null>(null);
	const [isLiveMode, setIsLiveMode] = useState(false);

	const [createPaymentIntent, { data, error }] = useMutation<IntentData, IntentVars>(CREATE_PAYMENT_INTENT);

	const handleCreatePaymentIntent = () => {
		void createPaymentIntent({
			variables: {
				reCaptchaToken,
				input: bookingInput,
			},
		});
	};

	useEffect(() => {
		if (bookingInput.paymentMethod === PaymentMethod.CARD && paymentMethodRef.current !== bookingInput.paymentMethod) {
			paymentMethodRef.current = bookingInput.paymentMethod;
			handleCreatePaymentIntent();
		}

		if (paymentMethodRef.current === null) {
			paymentMethodRef.current = bookingInput.paymentMethod;
		}
	}, [bookingInput.paymentMethod]);

	useEffect(() => {
		if (data) {
			setClientSecret(data.createPaymentIntent.clientSecret);
			setBookingID(data.createPaymentIntent.bookingID);
			setIsLiveMode(data.createPaymentIntent.isLiveMode);
		}
	}, [data]);

	if (!clientSecret || !bookingID) {
		return (
			<div className="flex py-10 items-center justify-center">
				<Loading />
			</div>
		);
	}

	if (error) {
		return <FormError error={error} />;
	}

	return (
		<StripeProvider clientSecret={clientSecret}>
			{!isLiveMode && <Error errors={["Test Mode - Your card will not be charged"]} />}
			<CardForm
				bookingID={bookingID}
				onSubmitted={onSubmitted}
				onSubmit={onSubmit}
				isFetchingPageData={isFetchingPageData}
			/>
		</StripeProvider>
	);
};

interface Props {
	isFetchingPageData: boolean;
	reCaptchaToken: string;
	onSubmit: () => void;
	bookingInput: BookingInput;
	onSubmitted: () => void;
}

type IntentData = CreatePaymentIntentMutation;
type IntentVars = CreatePaymentIntentMutationVariables;

export default PaymentPageStripe;
