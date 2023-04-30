import { useLazyQuery, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import ArrowLeftOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SessionPageBooking from "../../components/booking";
import Button from "../../components/button";
import DetailsForm from "../../components/forms/details-form";
import Modal from "../../components/modal";
import {
	Booking,
	DetailsInput,
	GetAccountPageQuery,
	GetAccountPageQueryVariables,
	Session,
	UpdateStudentMutation,
	UpdateStudentMutationVariables,
} from "../../generated-types";
import { useModal } from "../../hooks";
import { capitalizeFirstLetter } from "../../utils";
import GET_ACCOUNT_PAGE from "./get-account-page.graphql";
import UPDATE_STUDENT from "./update-student.graphql";

const createdAtFormatter = new Intl.DateTimeFormat(undefined, {
	year: "numeric",
	month: "long",
	day: "numeric",
});

const AccountPage: FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated, logout, user } = useAuth0();
	const [isEditModalOpen, openEditModal, closeEditModal] = useModal();

	const [detailsInput, setDetailsInput] = useState<DetailsInput>({
		firstName: "",
		lastName: "",
		nickName: "",
		gender: "",
		mobilePhoneNumber: "",
		instagramUsername: "",
	});

	const [getAccountPage, queryResult] = useLazyQuery<QueryData, QueryVars>(GET_ACCOUNT_PAGE);
	const [updateStudent, mutationResult] = useMutation<MutationData, MutationVars>(UPDATE_STUDENT);

	const { data: queryData, loading, called, refetch } = queryResult;
	const { data: updateData } = mutationResult;

	const handleGoHome = () => {
		navigate("/");
	};

	const handleLogOut = () => {
		void logout({ logoutParams: { returnTo: window.location.origin } });
	};

	const handleUpdateStudent = () => {
		if (user?.sub) {
			void updateStudent({
				variables: {
					studentID: user.sub,
					detailsInput,
				},
			});
		}
	};

	useEffect(() => {
		if (user?.sub) {
			void getAccountPage({ variables: { studentID: user.sub } });
		}
	}, [user]);

	useEffect(() => {
		if (queryData) {
			const { details } = queryData.getStudentByID;

			setDetailsInput({
				firstName: details.firstName,
				lastName: details.lastName,
				nickName: details.nickName,
				gender: details.gender,
				mobilePhoneNumber: details.mobilePhoneNumber,
				instagramUsername: details.instagramUsername,
			});
		}
	}, [queryData]);

	useEffect(() => {
		if (updateData) {
			closeEditModal();
			void refetch();
		}
	}, [updateData]);

	if (!isAuthenticated && called && !loading) {
		return (
			<div className="p-4">
				<Button
					text="Home"
					ariaLabel="Go Back"
					onClick={handleGoHome}
					leftIcon={className => <HomeIcon className={className} />}
				/>
			</div>
		);
	}

	if (!queryData || !user) {
		return <p className="p-4">Loading...</p>;
	}

	const {
		getStudentByID: { details, bookings, createdAt },
	} = queryData;

	return (
		<div className="p-4 h-full flex flex-col gap-6">
			<h1 className="text-3xl pt-2 font-bold">Account</h1>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl underline">Details:</h2>
				<div>
					<p>
						OAuth Provider: <span className="text-gray-500">{user?.sub?.split("|")[0]}</span>
					</p>
					<p>
						First Name: <span className="text-gray-500">{details.firstName}</span>
					</p>
					<p>
						Last Name: <span className="text-gray-500">{details.lastName}</span>
					</p>
					<p>
						Nick Name: <span className="text-gray-500">{details.nickName ?? ""}</span>
					</p>
					<p>
						<Fragment>Gender: </Fragment>
						<span className="text-gray-500">
							{details.gender ? capitalizeFirstLetter(details.gender.toLowerCase()) : ""}
						</span>
					</p>
					<p>
						Mobile Number: <span className="text-gray-500">{details.mobilePhoneNumber ?? ""}</span>
					</p>
					<p>
						Instagram: <span className="text-gray-500">{details.instagramUsername ?? ""}</span>
					</p>
					<p>
						Created: <span className="text-gray-500">{createdAtFormatter.format(createdAt)}</span>
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						text="Edit"
						ariaLabel="Edit"
						onClick={openEditModal}
						leftIcon={className => <PencilIcon className={className} />}
					/>
					<Modal
						title="Edit Details"
						isOpen={isEditModalOpen}
						onClose={closeEditModal}
						contentClassName="flex flex-col gap-4"
						icon={className => <PencilIcon className={className} />}
						children={<DetailsForm input={detailsInput} onChange={setDetailsInput} />}
						buttons={
							<Fragment>
								<Button
									ariaLabel="Edit"
									text="Edit"
									onClick={handleUpdateStudent}
									leftIcon={className => <PencilIcon className={className} />}
								/>
								<Button
									ariaLabel="Cancel"
									text="Cancel"
									transparent
									onClick={closeEditModal}
									leftIcon={className => <XMarkIcon className={className} />}
								/>
							</Fragment>
						}
					/>
					<Button
						text="Log Out"
						ariaLabel="Log Out"
						onClick={handleLogOut}
						leftIcon={className => <ArrowLeftOnRectangleIcon className={className} />}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl underline">Bookings:</h2>
				<div className="bg-white flex flex-col w-full shadow-lg">
					{bookings.map(booking => (
						<SessionPageBooking
							booking={booking as Booking}
							key={booking.bookingID}
							hideDelete
							session={booking.session as Session}
							onBookingUpdated={() => {}}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

type QueryData = GetAccountPageQuery;
type QueryVars = GetAccountPageQueryVariables;
type MutationData = UpdateStudentMutation;
type MutationVars = UpdateStudentMutationVariables;

export default AccountPage;