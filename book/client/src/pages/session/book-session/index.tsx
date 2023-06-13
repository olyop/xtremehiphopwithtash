import { useAuth0 } from "@auth0/auth0-react";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/button";
import BookingForm from "../../../components/forms/booking-form";
import Modal from "../../../components/modal";
import SessionCard from "../../../components/session-card";
import { BookingInput, Session } from "../../../generated-types";
import { determineSessionDateLabel } from "../../../helpers";
import { useModal } from "../../../hooks";
import { initialInput } from "./initial-input";
import ToPaymentButton from "./to-payment-button";

const BookSession: FC<PropTypes> = ({ session, isSessionInPast }) => {
	const navigate = useNavigate();
	const { isAuthenticated, user, isLoading } = useAuth0();
	const [isModalOpen, openModal, closeModal] = useModal();

	const [showBookButtonLogIn, setShowBookButtonLogIn] = useState(false);
	const [input, setInput] = useState<BookingInput>(initialInput(session));

	const isLoggedIn = isAuthenticated && user;

	const canBook = !isSessionInPast && session.isCapacityRemaining;

	const handleBookClick = () => {
		if (isLoggedIn) {
			setShowBookButtonLogIn(false);
			if (canBook) {
				openModal();
			}
		} else {
			setShowBookButtonLogIn(true);
		}
	};

	const handleToPaymentScreenClick = () => {
		if (canBook) {
			const searchParams = new URLSearchParams();

			searchParams.append("sessionID", input.sessionID);
			searchParams.append("bookingQuantity", input.bookingQuantity.toString());

			if (input.equipmentQuantity) {
				searchParams.append("equipmentQuantity", input.equipmentQuantity.toString());
			}

			if (input.notes) {
				searchParams.append("notes", input.notes);
			}

			navigate({
				pathname: "/payment",
				search: searchParams.toString(),
			});
		}
	};

	const handleModalClose = () => {
		closeModal();
		setInput(initialInput(session));
	};

	useEffect(() => {
		if (showBookButtonLogIn) {
			setTimeout(() => {
				setShowBookButtonLogIn(false);
			}, 3000);
		}
	}, [showBookButtonLogIn]);

	const bookButtonText = isSessionInPast
		? "Elapsed"
		: session.isCapacityRemaining
		? showBookButtonLogIn
			? "Please Log In"
			: "Book Now"
		: "Fully Booked";

	return (
		<Fragment>
			<Button
				textClassName="!text-xl"
				text={bookButtonText}
				onClick={handleBookClick}
				transparent={showBookButtonLogIn}
				ariaLabel={bookButtonText}
				disabled={!isLoading && !canBook}
				className={`!h-14 px-6 shadow-xl hover:shadow-xl rounded-xl ${
					showBookButtonLogIn ? "!bg-amber-500 text-white" : ""
				}`}
				leftIcon={className => <CalendarIcon className={`${className} h-7 w-7`} />}
			/>
			<Modal
				isLarge
				className="z-30"
				disableCloseOnEscape
				isOpen={isModalOpen}
				onClose={handleModalClose}
				title="Book Session"
				subTitle={determineSessionDateLabel(session)}
				contentClassName="flex flex-col gap-4"
				icon={className => <CalendarIcon className={className} />}
				children={
					<Fragment>
						<SessionCard
							session={session}
							disableLink
							className="!h-36 shadow-none mb-2"
							imageClassName="!h-20"
						/>
						<BookingForm session={session} input={input} onChange={setInput} />
					</Fragment>
				}
				buttons={
					<Fragment>
						<ToPaymentButton onClick={handleToPaymentScreenClick} />
						<Button
							transparent
							text="Cancel"
							ariaLabel="Cancel"
							onClick={handleModalClose}
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

interface PropTypes {
	session: Session;
	isSessionInPast: boolean;
}

export default BookSession;
