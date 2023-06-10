import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, PropsWithChildren, createElement } from "react";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeProvider: FC<PropsWithChildren<PropTypes>> = ({ children, clientSecret }) => (
	<Elements
		stripe={stripe}
		options={{
			clientSecret,
		}}
	>
		{children}
	</Elements>
);

interface PropTypes {
	clientSecret: string;
}

export default StripeProvider;
