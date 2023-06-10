import { FC, Fragment, createElement } from "react";

import SessionCard from "../../components/session-card";
import { BookingCost, BookingInput, PaymentMethod, Session } from "../../generated-types";
import { currencyFormatter } from "../../intl";
import { determinePlural } from "../../utils";

const PaymentOverview: FC<PropTypes> = ({ session, input, bookingCost }) => (
	<div className="p-6 flex flex-col gap-4 items-stretch md:items-center border-b shadow-xl">
		<h1 className="text-2xl underline font-bold">Overview</h1>
		<SessionCard
			session={session}
			className="md:!w-[30rem] !h-40 !shadow-none"
			imageClassName="!h-24"
			disableLink
		/>
		<div className="flex flex-col w-full">
			<h4 className="text-gray-500">Booking Notes</h4>
			<p className="text-sm">{input.notes ?? "None"}</p>
		</div>
		<div className="w-full h-px bg-gray-300" />
		<div className="w-full">
			<h5 className="font-bold text-3xl mb-1">Price</h5>
			<div
				className={`grid grid-rows-[1fr,${input.equipmentQuantity ? "1fr" : ""},${
					input.couponCode ? "1fr" : ""
				},${
					input.paymentMethod === PaymentMethod[PaymentMethod.CARD] ? "1fr" : ""
				},18px,1fr] grid-cols-[3fr,1fr] font-mono text-lg select-none`}
			>
				<p className="text-sm truncate">
					{input.bookingQuantity} x Booking{determinePlural(input.bookingQuantity)}
				</p>
				<p className="text-sm justify-self-end">
					{currencyFormatter.format(bookingCost.bookingCost)}
				</p>
				{input.equipmentQuantity && (
					<Fragment>
						<p className="text-sm truncate">{input.equipmentQuantity ?? 0} x Step Hire</p>
						<p className="text-sm justify-self-end">
							{currencyFormatter.format(bookingCost.equipmentCost)}
						</p>
					</Fragment>
				)}
				{input.couponCode && (
					<Fragment>
						<p className="text-sm truncate">1 x Coupon ({bookingCost.couponDiscountPercentage}%)</p>
						<p className="text-sm justify-self-end">
							{currencyFormatter.format(bookingCost.couponDiscount)}
						</p>
					</Fragment>
				)}
				<div className="h-[2px] w-full bg-gray-500 my-[8px]" />
				<div className="h-[2px] w-full bg-gray-500 my-[8px]" />
				<p className="text-sm font-bold truncate">Total:</p>
				<p className="text-sm justify-self-end font-bold">
					{currencyFormatter.format(bookingCost.finalCost)}
				</p>
			</div>
		</div>
	</div>
);

interface PropTypes {
	session: Session;
	input: BookingInput;
	bookingCost: BookingCost;
}

export default PaymentOverview;
