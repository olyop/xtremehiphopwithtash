import { useQuery } from "@apollo/client";
import { FC, createElement } from "react";

import Booking from "../../components/booking";
import { Booking as BookingType, GetBookingsPageQuery, Session } from "../../generated-types";
import Page from "../page";
import GET_BOOKINGS_PAGE from "./get-bookings-page.graphql";

const BookingsPage: FC = () => {
	const { data, refetch } = useQuery<GetBookingsPageQuery>(GET_BOOKINGS_PAGE);

	const handleBookingUpdated = () => {
		void refetch();
	};

	return (
		<Page className="p-4 flex flex-col gap-12 pb-56">
			<h1 className="text-3xl pt-2 pb-4 px-8 font-bold text-center md:text-left border-b self-center">My Bookings</h1>
			<div className="flex flex-col gap-2">
				<div className="bg-white flex flex-col w-full shadow-lg">
					{data?.getStudentByID.bookings ? (
						data.getStudentByID.bookings.map(booking => (
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
				{data?.getStudentByID.bookings && data.getStudentByID.bookings.length > 0 && (
					<p>
						{data.getStudentByID.bookings.length} booking{data.getStudentByID.bookings.length === 1 ? "" : "s"}
					</p>
				)}
			</div>
		</Page>
	);
};

export default BookingsPage;
