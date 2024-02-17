import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { FC, Fragment, createElement } from "react";

import Booking from "../../components/booking";
import { Booking as BookingType, GetBookingsPageQuery, Session } from "../../generated-types";
import PageWithHeaderAndData from "../page-with-header-and-data";
import GET_BOOKINGS_PAGE from "./get-bookings-page.graphql";

const BookingsPage: FC = () => {
	const queryResult = useQuery<GetBookingsPageQuery>(GET_BOOKINGS_PAGE);

	const handleBookingUpdated = () => {
		void queryResult.refetch();
	};

	return (
		<PageWithHeaderAndData title="My Bookings" queryResult={queryResult} contentClassName="flex flex-col gap-2">
			{({ getStudentByID }) => (
				<Fragment>
					<div className="bg-white flex flex-col w-full shadow-lg">
						{getStudentByID.bookings ? (
							getStudentByID.bookings.map(booking => (
								<Booking
									hideUpdate
									hideCheckIn
									isLeftALink
									hideCallNow
									hideInstagram
									hideQuantities
									hideEquipmentFee
									hideStripePaymentLink
									key={booking.bookingID}
									booking={booking as BookingType}
									session={booking.session as Session}
									onBookingUpdated={handleBookingUpdated}
								/>
							))
						) : (
							<p className="text-gray-500 p-2">No booking</p>
						)}
					</div>
					{getStudentByID.bookings && getStudentByID.bookings.length > 0 && (
						<p>
							{getStudentByID.bookings.length} booking{getStudentByID.bookings.length === 1 ? "" : "s"}
						</p>
					)}
				</Fragment>
			)}
		</PageWithHeaderAndData>
	);
};

export default BookingsPage;
