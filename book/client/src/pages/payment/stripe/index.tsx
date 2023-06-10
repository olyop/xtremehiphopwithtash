import { useMutation } from "@apollo/client";
import { Dispatch, FC, SetStateAction, createElement, useEffect, useState } from "react";

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
	const [clientSecret, setClientSecret] = useState<string | null>(null);

	const [createPaymentIntent, { data, loading }] = useMutation<IntentData, IntentVars>(
		CREATE_PAYMENT_INTENT,
	);

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
		if (!loading && bookingInput.paymentMethod === PaymentMethod.CARD) {
			void handleCreatePaymentIntent();
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
