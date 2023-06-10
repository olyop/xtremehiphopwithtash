import { StripeElements } from "@stripe/stripe-js";

export const createStripeElements = (elements: StripeElements) => {
	if (document.getElementById("payment-form")) {
		elements
			.create("payment", { wallets: { applePay: "never", googlePay: "never" } })
			.mount("#payment-form");
	} else {
		throw new Error("No payment form found");
	}
};
