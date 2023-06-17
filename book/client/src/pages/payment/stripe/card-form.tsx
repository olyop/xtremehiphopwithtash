import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { Dispatch, FC, SetStateAction, createElement, useEffect, useState } from "react";

import { BookingInput } from "../../../generated-types";
import PaymentButton from "../payment-button";

const CardForm: FC<PropTypes> = ({ setIsPaying, bookingInput }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [hasCardFormLoaded, setHasCardFormLoaded] = useState(false);
	const [isCardFormComplete, setIsCardFormComplete] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleCardFormLoad = () => {
		setHasCardFormLoaded(true);
	};

	const handlePaymentElementChange = (event: StripePaymentElementChangeEvent) => {
		setIsCardFormComplete(event.complete);
	};

	const confirmPayment = async () => {
		if (stripe && elements) {
			setIsPaying(true);

			try {
				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${window.location.origin}/payment-success?sessionID=${bookingInput.sessionID}`,
					},
				});

				if (error.type === "card_error" || error.type === "validation_error") {
					setErrorMessage(error.message ?? "An error occurred. Please try again.");
				}
			} catch (error) {
				setErrorMessage(error instanceof Error ? error.message : "An error has occurred");
			} finally {
				setIsPaying(false);
			}
		}
	};

	const handleSubmit = () => {
		void confirmPayment();
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (errorMessage) {
			timeout = setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [errorMessage]);

	return (
		<div className="flex flex-col gap-12">
			<PaymentElement
				onReady={handleCardFormLoad}
				onChange={handlePaymentElementChange}
				options={{
					paymentMethodOrder: ["card", "apple_pay", "google_pay"],
				}}
			/>
			{errorMessage && <p className="text-red-500 rounded border border-red-500 bg-red-50 px-4 py-3">{errorMessage}</p>}
			{hasCardFormLoaded && (
				<PaymentButton
					text="Pay Now"
					onClick={handleSubmit}
					disabled={!stripe || !elements || !isCardFormComplete || bookingInput.reCaptchaToken === null}
				/>
			)}
		</div>
	);
};

interface PropTypes {
	bookingInput: BookingInput;
	setIsPaying: Dispatch<SetStateAction<boolean>>;
}

export default CardForm;
