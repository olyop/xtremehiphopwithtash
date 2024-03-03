import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { FC, Fragment, createElement, useEffect } from "react";

import Booking from "../../../components/booking";
import {
	Booking as BookingType,
	GetSessionBookingsQuery,
	GetSessionBookingsQueryVariables,
	Session,
} from "../../../generated-types";
import { currencyDollarsFormatter } from "../../../helpers/intl";
import { centsToDollars } from "../../../utils";
import GET_SESSION_BOOKINGS from "./get-session-bookings.graphql";

const SessionBookings: FC<Props> = ({ session, onBookingUpdated }) => {
	const [getBookings, bookingsResult] = useLazyQuery<Data, Vars>(GET_SESSION_BOOKINGS);

	const handleRefetch = () => {
		onBookingUpdated();
		void bookingsResult.refetch();
	};

	useEffect(() => {
		if (bookingsResult.data === undefined) {
			void getBookings({
				variables: {
					sessionID: session.sessionID,
				},
			});
		}
	}, []);

	return (
		<div className="rounded shadow-2xl">
			<h3 className="border-b p-2 text-xl">Bookings</h3>
			<p className="p-2 text-sm">
				Gross:
				<Fragment> </Fragment>
				{bookingsResult.data?.getSessionByID.gross
					? currencyDollarsFormatter.format(centsToDollars(bookingsResult.data.getSessionByID.gross))
					: "N/A"}
			</p>
			{bookingsResult.data ? (
				<Fragment>
					{bookingsResult.data.getSessionByID.bookings === null ? (
						<p className="border-t p-2">No bookings yet</p>
					) : (
						<div className="border-t">
							{bookingsResult.data.getSessionByID.bookings.map(booking => (
								<Booking
									isEditing
									hideReceipt
									hideDateLabel
									hideEquipmentFee
									session={session}
									isLeftALink={false}
									key={booking.bookingID}
									booking={booking as BookingType}
									onBookingUpdated={handleRefetch}
								/>
							))}
						</div>
					)}
				</Fragment>
			) : (
				<p className="p-2">Loading...</p>
			)}
		</div>
	);
};

type Data = GetSessionBookingsQuery;
type Vars = GetSessionBookingsQueryVariables;

interface Props {
	session: Session;
	onBookingUpdated: () => void;
}

export default SessionBookings;
