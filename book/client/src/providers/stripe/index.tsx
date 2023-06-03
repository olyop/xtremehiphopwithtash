import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, PropsWithChildren, createElement } from "react";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeProvider: FC<PropsWithChildren> = ({ children }) => (
	<Elements stripe={stripe} options={{ mode: "payment", amount: 2000, currency: "aud" }}>
		{children}
	</Elements>
);

export default StripeProvider;
