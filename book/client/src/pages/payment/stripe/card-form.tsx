import { ApolloError } from "@apollo/client/errors";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { FC, createElement, useEffect, useState } from "react";

import FormError from "../../../components/form-error";
import { createPaymentSuccessUrl } from "../create-payment-success-url";
import PaymentButton from "../payment-button";

const CardForm: FC<Props> = ({ bookingID, onSubmit, onSubmitted, isFetchingPageData }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [hasCardFormLoaded, setHasCardFormLoaded] = useState(false);
	const [isCardFormComplete, setIsCardFormComplete] = useState(false);
	const [formError, setFormError] = useState<ApolloError | null>(null);

	const handleCardFormLoad = () => {
		setHasCardFormLoaded(true);
	};

	const handlePaymentElementChange = (event: StripePaymentElementChangeEvent) => {
		setIsCardFormComplete(event.complete);
	};

	const confirmPayment = async () => {
		if (stripe && elements) {
			onSubmit();

			setFormError(null);

			try {
				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: createPaymentSuccessUrl(bookingID).toString(),
					},
				});

				// the page will redirect to the success page if the payment is successful

				setFormError(new ApolloError({ errorMessage: error.message ?? "An error occurred. Please try again." }));
			} catch (error) {
				if (error instanceof ApolloError) {
					setFormError(new ApolloError({ errorMessage: error.message }));
				} else {
					setFormError(new ApolloError({ errorMessage: "A unknown error occurred. Please try again." }));
				}
			} finally {
				onSubmitted();
			}
		}
	};

	const handleSubmit = () => {
		void confirmPayment();
	};

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		if (formError) {
			timeout = setTimeout(() => {
				setFormError(null);
			}, 10_000);
		}

		return () => {
			if (formError) {
				clearTimeout(timeout);
			}
		};
	}, [formError]);

	return (
		<div className="flex flex-col gap-12">
			<PaymentElement onReady={handleCardFormLoad} onChange={handlePaymentElementChange} />
			<FormError error={formError} />
			{hasCardFormLoaded && (
				<PaymentButton text="Pay Now" onClick={handleSubmit} disabled={isFetchingPageData || !isCardFormComplete} />
			)}
		</div>
	);
};

interface Props {
	bookingID: string;
	onSubmit: () => void;
	onSubmitted: () => void;
	isFetchingPageData: boolean;
}

export default CardForm;
