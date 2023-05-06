import { useAuth0 } from "@auth0/auth0-react";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import ChevronDoubleRightIcon from "@heroicons/react/24/solid/ChevronDoubleRightIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/button";
import FormError from "../../../components/form-error";
import BookingForm from "../../../components/forms/booking-form";
import Modal from "../../../components/modal";
import SessionCard from "../../../components/session-card";
import { BookingInput, Session } from "../../../generated-types";
import { useModal } from "../../../hooks";

const BookSession: FC<PropTypes> = ({ session, isSessionInPast }) => {
	const navigate = useNavigate();
	const { isAuthenticated, user, isLoading } = useAuth0();
	const [isModalOpen, openModal, closeModal] = useModal();
	const [showBookButtonLogIn, setShowBookButtonLogIn] = useState(false);

	const [input, setInput] = useState<BookingInput>({
		notes: "",
		isBringingOwnEquipment: false,
		sessionID: session.sessionID,
	});

	const isLoggedIn = isAuthenticated && user;

	const areSpotsAvailable = !!session.capacityRemaining;

	const canBook = !isSessionInPast && areSpotsAvailable;

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
			searchParams.append("isBringingOwnEquipment", input.isBringingOwnEquipment.toString());

			if (input.notes) {
				searchParams.append("notes", input.notes);
			}

			navigate({
				pathname: "/payment",
				search: searchParams.toString(),
			});
		}
	};

	useEffect(() => {
		if (showBookButtonLogIn) {
			setTimeout(() => {
				setShowBookButtonLogIn(false);
			}, 2000);
		}
	}, [showBookButtonLogIn]);

	const bookButtonText = isSessionInPast
		? "Elapsed"
		: areSpotsAvailable
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
					showBookButtonLogIn ? "!bg-amber-500" : ""
				}`}
				leftIcon={className => <CalendarIcon className={`${className} h-7 w-7`} />}
			/>
			<Modal
				isLarge
				className="z-30"
				disableCloseOnEscape
				isOpen={isModalOpen}
				onClose={closeModal}
				title="Book Session"
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
						<FormError error={undefined} />
					</Fragment>
				}
				buttons={
					<Fragment>
						<Button
							text="To Payment"
							ariaLabel="To Payment"
							onClick={handleToPaymentScreenClick}
							rightIcon={className => <ChevronDoubleRightIcon className={className} />}
						/>
						<Button
							transparent
							text="Cancel"
							ariaLabel="Cancel"
							onClick={closeModal}
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
