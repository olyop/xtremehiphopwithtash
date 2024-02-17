import { Elements } from "@stripe/react-stripe-js";
import { FC, PropsWithChildren, createElement } from "react";

import { stripe } from "../../clients/stripe";

const StripeProvider: FC<PropsWithChildren<Props>> = ({ children, clientSecret }) => (
	<Elements
		stripe={stripe}
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
