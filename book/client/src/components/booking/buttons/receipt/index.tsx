import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect } from "react";

import { Booking, GetBookingReceiptUrlQuery, GetBookingReceiptUrlQueryVariables } from "../../../../generated-types";
import { useModal } from "../../../../hooks";
import Button from "../../../button";
import Modal from "../../../modal";
import GET_BOOKING_RECEIPT_URL from "./get-booking-receipt-url.graphql";

const BookingReceipt: FC<Props> = ({ booking }) => {
	const [isModalOpen, openModal, closeModal] = useModal();

	const [getBookingReceiptURL, { data, error, loading }] = useLazyQuery<Data, Vars>(GET_BOOKING_RECEIPT_URL);

	const handleGetBookingReceiptURL = () => {
		void getBookingReceiptURL({
			variables: {
				bookingID: booking.bookingID,
			},
		});
	};

	useEffect(() => {
		if (isModalOpen && !loading) {
			handleGetBookingReceiptURL();
		}
	}, [isModalOpen, loading]);

	return (
		<Fragment>
			<Button
				transparent
				text="Receipt"
				onClick={openModal}
				className="!h-7 !px-2 !text-xs"
				ariaLabel="View Booking Receipt"
				leftIcon={className => <DocumentTextIcon className={`!h-4 !w-4 ${className}}`} />}
			/>
			<Modal
				title="Booking Receipt"
				isOpen={isModalOpen}
				onClose={closeModal}
				icon={className => <DocumentTextIcon className={className} />}
				contentClassName="flex flex-col gap-4"
				error={error}
				children="View your booking receipt."
				buttons={
					<Fragment>
						<a href={data?.getBookingReceiptURL ?? "#"} target="_blank" rel="noreferrer">
							<Button
								disabled={data === undefined}
								ariaLabel="View Booking Receipt"
								text={data === undefined ? "Loading..." : "View"}
								leftIcon={className => <EyeIcon className={className} />}
							/>
						</a>
						<Button
							text="Close"
							ariaLabel="Cancel"
							transparent
							onClick={closeModal}
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

interface Props {
	booking: Booking;
}

type Data = GetBookingReceiptUrlQuery;
type Vars = GetBookingReceiptUrlQueryVariables;

export default BookingReceipt;
