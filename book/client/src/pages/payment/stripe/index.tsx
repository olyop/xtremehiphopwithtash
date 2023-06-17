import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { Dispatch, FC, SetStateAction, createElement, useEffect, useRef, useState } from "react";

import {
	BookingInput,
	CreatePaymentIntentMutation,
	CreatePaymentIntentMutationVariables,
	PaymentMethod,
} from "../../../generated-types";
import StripeProvider from "../../../providers/stripe";
import CardForm from "./card-form";
import CREATE_PAYMENT_INTENT from "./create-payment-intent.graphql";

const PaymentPageStripe: FC<PropTypes> = ({ bookingInput, setIsPaying }) => {
	const paymentMethodRef = useRef<PaymentMethod | null>(null);
	const [clientSecret, setClientSecret] = useState<string | null>(null);

	const [createPaymentIntent, { data }] = useMutation<IntentData, IntentVars>(CREATE_PAYMENT_INTENT);

	const handleCreatePaymentIntent = () => {
		if (bookingInput) {
			void createPaymentIntent({
				variables: {
					input: bookingInput,
				},
			});
		}
	};

	useEffect(() => {
		if (bookingInput.paymentMethod === PaymentMethod.CARD && paymentMethodRef.current !== bookingInput.paymentMethod) {
			paymentMethodRef.current = bookingInput.paymentMethod;
			void handleCreatePaymentIntent();
		}

		if (paymentMethodRef.current === null) {
			paymentMethodRef.current = bookingInput.paymentMethod;
		}
	}, [bookingInput.paymentMethod]);

	useEffect(() => {
		if (data) {
			setClientSecret(data.createPaymentIntent.clientSecret);
		}
	}, [data]);

	if (!clientSecret) {
		return null;
	}

	return (
		<StripeProvider clientSecret={clientSecret}>
			<CardForm setIsPaying={setIsPaying} bookingInput={bookingInput} />
		</StripeProvider>
	);
};

interface PropTypes {
	bookingInput: BookingInput;
	setIsPaying: Dispatch<SetStateAction<boolean>>;
}

type IntentData = CreatePaymentIntentMutation;
type IntentVars = CreatePaymentIntentMutationVariables;

export default PaymentPageStripe;