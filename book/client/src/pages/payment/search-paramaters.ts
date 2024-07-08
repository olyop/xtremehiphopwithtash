import { SetURLSearchParams } from "react-router-dom";

import { BookingInput, PaymentMethod } from "../../generated-types";

const verifyIntegerParam = (value: string | null, required: boolean) => {
	if (value) {
		try {
			const parsed = Number.parseInt(value);
			if (Number.isNaN(parsed)) {
				return false;
			} else if (parsed < 0) {
				return false;
			} else if (parsed > 5) {
				return false;
			} else {
				return true;
			}
		} catch {
			return false;
		}
	} else {
		return !required;
	}
};

const verifyPaymenMethodParam = (value: string | null, required: boolean) => {
	if (value) {
		return Object.values(PaymentMethod).includes(value as PaymentMethod);
	} else {
		return !required;
	}
};

export const createSyncSearchParams =
	(setSearchParams: SetURLSearchParams) => (key: string, value: string | number | boolean | null | undefined) => {
		setSearchParams(
			prevSearchParams => {
				if (value) {
					const valueString = String(value);

					if (prevSearchParams.has(key)) {
						prevSearchParams.set(key, valueString);
					} else {
						prevSearchParams.append(key, valueString);
					}
				} else {
					prevSearchParams.delete(key);
				}

				return prevSearchParams;
			},
			{
				replace: true,
			},
		);
	};

export const mapSearchParamsToBookingInput = (searchParams: URLSearchParams): BookingInput | null => {
	const sessionIDParam = searchParams.get("sessionID");
	const notesParam = searchParams.get("notes");
	const couponParam = searchParams.get("coupon");
	const bookingQuantityParam = searchParams.get("bookingQuantity");
	const equipmentQuantityParam = searchParams.get("equipmentQuantity");
	const paymentMethodParam = searchParams.get("paymentMethod");
	const hasSignedWaiver = searchParams.get("hasSignedWaiver");

	if (
		sessionIDParam &&
		bookingQuantityParam &&
		verifyIntegerParam(bookingQuantityParam, true) &&
		verifyIntegerParam(equipmentQuantityParam, false) &&
		verifyPaymenMethodParam(paymentMethodParam, false)
	) {
		const bookingQuantity = Number.parseInt(bookingQuantityParam, 10);
		const equipmentQuantity = equipmentQuantityParam ? Number.parseInt(equipmentQuantityParam, 10) : null;

		if (equipmentQuantity && equipmentQuantity > bookingQuantity) {
			return null;
		}

		return {
			sessionID: sessionIDParam,
			notes: notesParam,
			bookingQuantity: Number.parseInt(bookingQuantityParam),
			equipmentQuantity: equipmentQuantityParam ? Number.parseInt(equipmentQuantityParam) : null,
			couponCode: couponParam,
			paymentMethod: paymentMethodParam ? (paymentMethodParam as PaymentMethod) : null,
			hasSignedWaiver: hasSignedWaiver === null ? null : hasSignedWaiver === "true",
		};
	} else {
		return null;
	}
};
