import { Dispatch, FC, SetStateAction, createElement } from "react";

import Input, { InputType } from "../../components/input";
import { BookingInput, PaymentMethod } from "../../generated-types";

const PaymentMethodForm: FC<Props> = ({ paymentMethod, setBookingInput }) => {
	const handleCardClick = () => {
		if (paymentMethod === PaymentMethod.CARD) {
			setBookingInput(prevState => {
				if (prevState) {
					return {
						...prevState,
						paymentMethod: null,
					};
				} else {
					return null;
				}
			});
		} else {
			setBookingInput(prevState => {
				if (prevState) {
					return {
						...prevState,
						paymentMethod: PaymentMethod[PaymentMethod.CARD],
					};
				} else {
					return null;
				}
			});
		}
	};

	const handleCouponClick = () => {
		if (paymentMethod === PaymentMethod.CASH) {
			setBookingInput(prevState => {
				if (prevState) {
					return {
						...prevState,
						paymentMethod: null,
					};
				} else {
					return null;
				}
			});
		} else {
			setBookingInput(prevState => {
				if (prevState) {
					return {
						...prevState,
						paymentMethod: PaymentMethod[PaymentMethod.CASH],
					};
				} else {
					return null;
				}
			});
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-2xl">Payment Method</h2>
			<div className="border rounded-lg bg-white shadow-md">
				<div
					role="button"
					tabIndex={1}
					onClick={handleCardClick}
					onKeyDown={handleCardClick}
					className={`${paymentMethod === PaymentMethod.CARD ? "bg-gray-100" : ""} px-4 py-5`}
				>
					<Input
						id="stripe"
						type={InputType.CHECKBOX}
						name="Card / Apple Pay / Google Pay"
						value={paymentMethod === PaymentMethod.CARD}
						autoComplete="off"
						labelClassName="!bg-transparent leading-none"
						className="pointer-events-none items-center gap-4"
					/>
				</div>
				<div className="w-full h-px bg-gray-200" />
				<div
					role="button"
					tabIndex={2}
					onClick={handleCouponClick}
					onKeyDown={handleCouponClick}
					className={`${paymentMethod === PaymentMethod.CASH ? "bg-gray-100" : ""} px-4 py-5`}
				>
					<Input
						id="cash"
						type={InputType.CHECKBOX}
						name="Cash"
						value={paymentMethod === PaymentMethod.CASH}
						autoComplete="off"
						labelClassName="!bg-transparent leading-none"
						className="pointer-events-none items-center gap-4"
					/>
				</div>
			</div>
		</div>
	);
};

interface Props {
	paymentMethod: string | null;
	setBookingInput: Dispatch<SetStateAction<BookingInput | null>>;
}

export default PaymentMethodForm;
