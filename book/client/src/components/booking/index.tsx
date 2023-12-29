import { FC, Fragment, createElement } from "react";

import { Booking, PaymentMethod, Session } from "../../generated-types";
import { isInPast } from "../../helpers/date";
import { currencyDollarsFormatter, dateTimeFormatter } from "../../helpers/intl";
import { determineDetailsFullName, determineSessionDateLabel } from "../../helpers/util";
import { centsToDollars, determinePlural } from "../../utils";
import Entity from "../entity";
import SessionStartTime from "../session-start-end-time";
import BookingCallNow from "./buttons/call-now";
import BookingCancel from "./buttons/cancel";
import BookingCheckIn from "./buttons/check-in";
import BookingReceipt from "./buttons/receipt";
import BookingStripe from "./buttons/stripe";
import BookingUpdate from "./buttons/update";

const SessionPageBooking: FC<Props> = ({
	session,
	booking,
	onBookingUpdated,
	isEditing = false,
	hideCancel = false,
	hideUpdate = false,
	hideCallNow = false,
	hideReceipt = false,
	hideCheckIn = false,
	isLeftALink = false,
	hideInstagram = false,
	hideDateLabel = false,
	hideQuantities = false,
	hideEquipmentFee = false,
	hideStripePaymentLink = false,
}) => {
	const isSessionInPast = isInPast(new Date(session.endTime));

	const paymentDescription =
		booking.paymentMethod === null
			? "FREE session"
			: booking.paymentMethod === PaymentMethod.COUPON
			  ? "Paid in full with COUPON"
			  : booking.paymentMethod === PaymentMethod.CASH && booking.cost
			    ? `${isSessionInPast ? "Paid" : "Will pay"} ${currencyDollarsFormatter.format(
							centsToDollars(booking.cost),
			      )} in CASH`
			    : booking.paymentMethod === PaymentMethod.CARD && booking.cost
			      ? `Paid ${currencyDollarsFormatter.format(centsToDollars(booking.cost))} with CARD`
			      : "Unknown payment method";

	const sessionDateAndTimeLabel = (
		<Fragment>
			<span className="text-gray-500">from </span>
			<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
			<br />
			<span className="text-gray-500">on </span>
			<Fragment> </Fragment>
			{determineSessionDateLabel(session, true, true)}
		</Fragment>
	);

	return (
		<Entity
			id={booking.bookingID}
			isLeftALink={isLeftALink}
			rightClassName="py-2 pr-3 flex flex-col gap-1 !items-end"
			leftLink={isLeftALink ? `/session/${session.sessionID}` : undefined}
			className={`!p-0 ${isSessionInPast || booking.isCancelled ? "bg-gray-100" : ""}`}
			leftClassName={`p-2 pl-3 grow ${isLeftALink ? "hover:bg-gray-100 transition-colors" : ""}`}
			text={
				hideUpdate
					? booking.session.title
					: `${determineDetailsFullName(booking.student.details)}${
							!hideInstagram && booking.student.details.instagramUsername
								? ` @${booking.student.details.instagramUsername}`
								: ""
					  }`
			}
			description={
				<Fragment>
					{hideDateLabel || (
						<Fragment>
							{sessionDateAndTimeLabel}
							<br />
						</Fragment>
					)}
					<Fragment>
						{booking.bookingQuantity} x booking{determinePlural(booking.bookingQuantity)}
					</Fragment>
					{booking.equipmentQuantity && (
						<Fragment>
							<Fragment>, </Fragment>
							{booking.equipmentQuantity} x step{determinePlural(booking.equipmentQuantity)}
							<Fragment> </Fragment>
							{booking.equipmentQuantity === 1 ? "hire" : "hired"}
						</Fragment>
					)}
					<br />
					{paymentDescription}
					{booking.notes && (
						<Fragment>
							<br />
							<span className="text-gray-500">{booking.notes}</span>
						</Fragment>
					)}
					{hideUpdate ? null : (
						<Fragment>
							<br />
							<span className="text-gray-500">Booking Time: {dateTimeFormatter.format(booking.createdAt)}</span>
							{booking.isCancelled && booking.cancelledAt && (
								<Fragment>
									<br />
									<span className="text-gray-500">Cancelled Time: {dateTimeFormatter.format(booking.cancelledAt)}</span>
								</Fragment>
							)}
						</Fragment>
					)}
				</Fragment>
			}
			rightContent={
				<Fragment>
					{!hideCheckIn && !booking.isCancelled && (
						<BookingCheckIn
							booking={booking}
							paymentDescription={paymentDescription}
							onBookingUpdated={onBookingUpdated}
						/>
					)}
					{!hideCancel && <BookingCancel session={session} booking={booking} onBookingUpdated={onBookingUpdated} />}
					{!hideReceipt && booking.paymentMethod === PaymentMethod.CARD && <BookingReceipt booking={booking} />}
					{!hideCallNow && !isSessionInPast && <BookingCallNow booking={booking} />}
					{!hideStripePaymentLink && booking.paymentMethod === PaymentMethod.CARD && booking.paymentIntentID && (
						<BookingStripe booking={booking} />
					)}
					{!hideUpdate && !booking.isCancelled && !isSessionInPast && (
						<BookingUpdate
							session={session}
							booking={booking}
							isEditing={isEditing}
							hideQuantities={hideQuantities}
							hideEquipmentFee={hideEquipmentFee}
							onBookingUpdated={onBookingUpdated}
						/>
					)}
				</Fragment>
			}
		/>
	);
};

interface Props {
	session: Session;
	booking: Booking;
	isEditing?: boolean;
	hideUpdate?: boolean;
	hideCancel?: boolean;
	hideCheckIn?: boolean;
	hideReceipt?: boolean;
	hideCallNow?: boolean;
	isLeftALink?: boolean;
	hideDateLabel?: boolean;
	hideInstagram?: boolean;
	hideQuantities?: boolean;
	hideEquipmentFee?: boolean;
	hideStripePaymentLink?: boolean;
	onBookingUpdated: () => void;
}

export default SessionPageBooking;
