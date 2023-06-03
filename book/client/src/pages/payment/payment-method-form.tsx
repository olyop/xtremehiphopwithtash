import { Dispatch, FC, SetStateAction, createElement } from "react";

import Input, { InputType } from "../../components/input";
import { BookingInput, PaymentMethod } from "../../generated-types";
import { noop } from "../../utils";

const PaymentMethodForm: FC<PropTypes> = ({ paymentMethod, setBookingInput }) => {
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
			<h1 className="text-xl">Payment Method</h1>
			<div className="border rounded-lg bg-white shadow-md">
				<div
					role="button"
					tabIndex={1}
					onClick={handleCardClick}
					onKeyDown={handleCardClick}
					className={`${paymentMethod === PaymentMethod.CARD ? "bg-gray-100" : ""} p-4`}
				>
					<Input
						id="stripe"
						type={InputType.CHECKBOX}
						labelClassName="!bg-transparent"
						name="Card / Apple Pay / Google Pay"
						className="pointer-events-none"
						value={paymentMethod === PaymentMethod.CARD}
						onChange={noop}
						autoComplete="off"
					/>
				</div>
				<div className="w-full h-px bg-gray-200" />
				<div
					role="button"
					tabIndex={2}
					onClick={handleCouponClick}
					onKeyDown={handleCouponClick}
					className={`${paymentMethod === PaymentMethod.CASH ? "bg-gray-100" : ""} p-4`}
				>
					<Input
						id="cash"
						type={InputType.CHECKBOX}
						name="Cash"
						labelClassName="!bg-transparent"
						className="pointer-events-none"
						value={paymentMethod === PaymentMethod.CASH}
						onChange={noop}
						autoComplete="off"
					/>
				</div>
			</div>
		</div>
	);
};

interface PropTypes {
	paymentMethod: string | null;
	setBookingInput: Dispatch<SetStateAction<BookingInput | null>>;
}

export default PaymentMethodForm;
