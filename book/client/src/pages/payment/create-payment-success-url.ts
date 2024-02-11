export const createPaymentSuccessUrl = (bookingID: string) => {
	const url = new URL("payment-success", window.location.href);

	url.searchParams.append("bookingID", bookingID);

	return url;
};
