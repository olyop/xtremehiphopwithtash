import { FC, Fragment, createElement } from "react";

import SessionCard from "../../components/session-card";
import { BookingCost, BookingInput, PaymentMethod, Session } from "../../generated-types";
import { currencyDollarsFormatter } from "../../helpers/intl";
import { centsToDollars, determinePlural } from "../../utils";

const PaymentOverview: FC<Props> = ({ session, input, bookingCost }) => (
	<div className="flex flex-col items-stretch gap-4 border-b p-6 shadow-xl md:items-center">
		<h1 className="text-2xl font-bold underline">Overview</h1>
		<SessionCard
			session={session}
			className="!h-44 !shadow-none md:!w-[30rem]"
			imageClassName="!h-24"
			disableLink
			showDate
		/>
		<div className="flex w-full flex-col gap-2">
			<div>
				<h4 className="text-gray-500">{input.bookingQuantity === 1 ? "Quantity" : "Quantities"}</h4>
				<p className="text-sm">
					{input.bookingQuantity} booking{determinePlural(input.bookingQuantity)}
					{input.equipmentQuantity && (
						<Fragment>
							<Fragment>, </Fragment>
							{input.equipmentQuantity} step hire{determinePlural(input.equipmentQuantity)}
						</Fragment>
					)}
				</p>
			</div>
			<div>
				<h4 className="text-gray-500">Booking Notes</h4>
				<p className="text-sm">{input.notes ?? "None"}</p>
			</div>
		</div>
		<div className="h-px w-full bg-gray-300" />
		<div className="w-full font-mono">
			<h2 className="mb-1 text-2xl">Price</h2>
			<div
				className={`grid grid-rows-[1fr,${input.equipmentQuantity ? "1fr" : ""},${input.couponCode ? "1fr" : ""},${
					input.paymentMethod === PaymentMethod[PaymentMethod.CARD] ? "1fr" : ""
				},18px,1fr] select-none grid-cols-[3fr,1fr] text-lg`}
			>
				<p className="truncate text-sm">
					{input.bookingQuantity} x Booking{determinePlural(input.bookingQuantity)}
				</p>
				<p className="justify-self-end text-sm">
					{currencyDollarsFormatter.format(centsToDollars(bookingCost.sessionCost))}
				</p>
				{input.equipmentQuantity && (
					<Fragment>
						<p className="truncate text-sm">{input.equipmentQuantity} x Step Hire</p>
						<p className="justify-self-end text-sm">
							{currencyDollarsFormatter.format(centsToDollars(bookingCost.equipmentCost))}
						</p>
					</Fragment>
				)}
				{input.couponCode && (
					<Fragment>
						<p className="truncate text-sm">1 x Coupon ({bookingCost.couponDiscountPercentage}%)</p>
						<p className="justify-self-end text-sm">
							<Fragment>-</Fragment>
							{currencyDollarsFormatter.format(centsToDollars(bookingCost.couponDiscount))}
						</p>
					</Fragment>
				)}
				{input.paymentMethod === PaymentMethod.CARD && bookingCost.cardSurcharge !== 0 && (
					<Fragment>
						<p className="truncate text-sm">1 x Card Processing Fee</p>
						<p className="justify-self-end text-sm">
							{currencyDollarsFormatter.format(centsToDollars(bookingCost.cardSurcharge))}
						</p>
					</Fragment>
				)}
				<div className="my-[8px] h-[2px] w-full bg-gray-500" />
				<div className="my-[8px] h-[2px] w-full bg-gray-500" />
				<p className="truncate text-sm font-bold">Total:</p>
				<p className="justify-self-end text-sm font-bold">
					{currencyDollarsFormatter.format(centsToDollars(bookingCost.finalCost))}
				</p>
			</div>
		</div>
	</div>
);

interface Props {
	session: Session;
	input: BookingInput;
	bookingCost: BookingCost;
}

export default PaymentOverview;
