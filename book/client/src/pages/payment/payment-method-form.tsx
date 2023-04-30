import { Dispatch, FC, SetStateAction, createElement } from "react";

import Input, { InputType } from "../../components/input";
import { noop } from "../../utils";
import { PaymentMethod } from "./types";

const PaymentMethodForm: FC<PropTypes> = ({ paymentMethod, onChange }) => {
	const handleStripeClick = () => {
		if (paymentMethod === PaymentMethod.STRIPE) {
			onChange(PaymentMethod.UNCHOSEN);
		} else {
			onChange(PaymentMethod.STRIPE);
		}
	};

	const handleCouponClick = () => {
		if (paymentMethod === PaymentMethod.COUPON) {
			onChange(PaymentMethod.UNCHOSEN);
		} else {
			onChange(PaymentMethod.COUPON);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-xl">Payment Method</h1>
			<div className="border rounded-lg bg-white shadow-md">
				<div
					role="button"
					tabIndex={1}
					onClick={handleStripeClick}
					onKeyDown={handleStripeClick}
					className={`${paymentMethod === PaymentMethod.STRIPE ? "bg-gray-100" : ""} p-4`}
				>
					<Input
						id="stripe"
						type={InputType.CHECKBOX}
						labelClassName="!bg-transparent"
						name="Card / Apple Pay / Google Pay"
						className="pointer-events-none"
						value={paymentMethod === PaymentMethod.STRIPE}
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
					className={`${paymentMethod === PaymentMethod.COUPON ? "bg-gray-100" : ""} p-4`}
				>
					<Input
						id="coupon"
						type={InputType.CHECKBOX}
						name="Referral Code"
						labelClassName="!bg-transparent"
						className="pointer-events-none"
						value={paymentMethod === PaymentMethod.COUPON}
						onChange={noop}
						autoComplete="off"
					/>
				</div>
			</div>
		</div>
	);
};

interface PropTypes {
	paymentMethod: PaymentMethod;
	onChange: Dispatch<SetStateAction<PaymentMethod>>;
}

export default PaymentMethodForm;
