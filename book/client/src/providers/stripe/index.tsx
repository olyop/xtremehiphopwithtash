import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, PropsWithChildren, createElement } from "react";

const StripeProvider: FC<PropsWithChildren<Props>> = ({ children, clientSecret }) => (
	<Elements
		stripe={loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)}
		options={{
			clientSecret,
		}}
	>
		{children}
	</Elements>
);

interface Props {
	clientSecret: string;
}

export default StripeProvider;
