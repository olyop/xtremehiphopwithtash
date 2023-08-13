import { ApolloError, useApolloClient } from "@apollo/client";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { Dispatch, FC, SetStateAction, createElement, useEffect, useState } from "react";

import FormError from "../../../components/form-error";
import { BookingInput } from "../../../generated-types";
import PaymentButton from "../payment-button";
import { checkCanBookSession } from "./check-can-book-session";

const CardForm: FC<PropTypes> = ({ setIsPaying, bookingInput, onSubmit }) => {
	const stripe = useStripe();
	const elements = useElements();
	const apollo = useApolloClient();

	const [hasCardFormLoaded, setHasCardFormLoaded] = useState(false);
	const [isCardFormComplete, setIsCardFormComplete] = useState(false);
	const [formError, setFormError] = useState<ApolloError | undefined>(undefined);

	const handleCardFormLoad = () => {
		setHasCardFormLoaded(true);
	};

	const handlePaymentElementChange = (event: StripePaymentElementChangeEvent) => {
		setIsCardFormComplete(event.complete);
	};

	const confirmPayment = async () => {
		if (stripe && elements) {
			setIsPaying(true);
			setFormError(undefined);

			try {
				const canBookSession = await checkCanBookSession(apollo, bookingInput);

				if (canBookSession instanceof ApolloError) {
					setFormError(canBookSession);
					return;
				}

				if (!canBookSession) {
					setFormError(new ApolloError({ errorMessage: "This session is no longer available." }));
					return;
				}

				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${window.location.origin}/payment-success?sessionID=${bookingInput.sessionID}`,
					},
				});

				if (error) {
					setFormError(new ApolloError({ errorMessage: error.message ?? "An error occurred. Please try again." }));
				}
			} catch (error) {
				if (error instanceof ApolloError) {
					setFormError(new ApolloError({ errorMessage: error.message }));
				} else {
					setFormError(new ApolloError({ errorMessage: "An error occurred. Please try again." }));
				}
			} finally {
				setIsPaying(false);
			}
		}
	};

	const handleSubmit = () => {
		onSubmit();
		void confirmPayment();
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (formError) {
			timeout = setTimeout(() => {
				setFormError(undefined);
			}, 10_000);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [formError]);

	return (
		<div className="flex flex-col gap-12">
			<PaymentElement onReady={handleCardFormLoad} onChange={handlePaymentElementChange} />
			<FormError error={formError} />
			{hasCardFormLoaded && (
				<PaymentButton text="Pay Now" onClick={handleSubmit} disabled={!stripe || !elements || !isCardFormComplete} />
			)}
		</div>
	);
};

interface PropTypes {
	bookingInput: BookingInput;
	onSubmit: () => void;
	setIsPaying: Dispatch<SetStateAction<boolean>>;
}

export default CardForm;
