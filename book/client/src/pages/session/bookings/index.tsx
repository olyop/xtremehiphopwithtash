import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { FC, Fragment, createElement, useEffect } from "react";

import SessionPageBooking from "../../../components/booking";
import { Booking, GetSessionBookingsQuery, GetSessionBookingsQueryVariables, Session } from "../../../generated-types";
import GET_SESSION_BOOKINGS from "./get-session-bookings.graphql";

const SessionBookings: FC<PropTypes> = ({ session }) => {
	const [getBookings, bookingsResult] = useLazyQuery<Data, Vars>(GET_SESSION_BOOKINGS);

	const handleRefetch = () => {
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
		<div className="shadow-2xl rounded">
			<h3 className="text-xl p-2 border-b">Bookings</h3>
			{bookingsResult.data ? (
				<Fragment>
					{bookingsResult.data.getSessionByID.bookings === null ? (
						<p className="p-2">No bookings yet</p>
					) : (
						<div>
							{bookingsResult.data.getSessionByID.bookings.map(booking => (
								<SessionPageBooking
									isEditing
									session={session}
									hideEquipmentFee
									booking={booking as Booking}
									key={booking.bookingID}
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

interface PropTypes {
	session: Session;
}

export default SessionBookings;
