import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
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
import Loading from "../../components/loading";
import Modal from "../../components/modal";
import {
	Booking,
	Details,
	DetailsInput,
	GetAccountPageQuery,
	Session,
	UpdateStudentMutation,
	UpdateStudentMutationVariables,
} from "../../generated-types";
import { useModal } from "../../hooks";
import Page from "../page";
import { detailsToInput } from "./details-to-input";
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

	const [detailsInput, setDetailsInput] = useState<DetailsInput | null>(null);

	const [getAccountPage, queryResult] = useLazyQuery<QueryData>(GET_ACCOUNT_PAGE);

	const [updateStudent, updateStudentResult] = useMutation<MutationData, MutationVars>(UPDATE_STUDENT);

	const { data: queryData, loading, called, refetch } = queryResult;

	const handleGoHome = () => {
		navigate("/");
	};

	const handleLogOut = () => {
		void logout({
			logoutParams: {
				returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URL,
			},
		});
	};

	const handleUpdateStudent = () => {
		if (user?.sub && detailsInput) {
			void updateStudent({
				variables: {
					detailsInput,
				},
			});
		}
	};

	useEffect(() => {
		if (user?.sub) {
			void getAccountPage();
		}
	}, [user]);

	useEffect(() => {
		if (queryData) {
			const details = queryData.getStudentByID.details as Details;
			setDetailsInput(detailsToInput(details));
		}
	}, [queryData]);

	useEffect(() => {
		if (updateStudentResult.data) {
			closeEditModal();
			void refetch();
		}
	}, [updateStudentResult.data]);

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
		return (
			<div className="h-content-height w-full flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	const {
		getStudentByID: { details, bookings, createdAt },
	} = queryData;

	const detailsClassName = "flex flex-col gap-1";

	return (
		<Page className="p-4 flex flex-col gap-6 pb-56">
			<h1 className="text-3xl py-2 font-bold text-center md:text-left">My Account</h1>
			<div className={detailsClassName}>
				<p>
					OAuth Provider: <span className="text-gray-500">{user?.sub?.split("|")[0]}</span>
				</p>
				<p>
					Created: <span className="text-gray-500">{createdAtFormatter.format(createdAt)}</span>
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl underline">Details:</h2>
				<div className={detailsClassName}>
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
						Mobile Number: <span className="text-gray-500">{details.mobilePhoneNumber ?? ""}</span>
					</p>
					<p>
						Instagram: <span className="text-gray-500">{details.instagramUsername ?? ""}</span>
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						text="Edit"
						ariaLabel="Edit"
						onClick={openEditModal}
						leftIcon={className => <PencilIcon className={className} />}
					/>
					{detailsInput && (
						<Modal
							title="Edit Details"
							isOpen={isEditModalOpen}
							onClose={closeEditModal}
							contentClassName="flex flex-col gap-4"
							icon={className => <PencilIcon className={className} />}
							children={<DetailsForm input={detailsInput} onChange={setDetailsInput} />}
							error={updateStudentResult.error}
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
					)}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl underline">Bookings:</h2>
				<div className="bg-white flex flex-col w-full shadow-lg">
					{bookings ? (
						bookings.map(booking => (
							<SessionPageBooking
								hideDelete
								hideCheckIn
								hideUpdate
								hideQuantities
								hideEquipmentFee
								key={booking.bookingID}
								booking={booking as Booking}
								session={booking.session as Session}
								onBookingUpdated={queryResult.refetch}
							/>
						))
					) : (
						<p className="text-gray-500 p-4">No bookings</p>
					)}
				</div>
			</div>
			<Button
				text="Log Out"
				ariaLabel="Log Out"
				onClick={handleLogOut}
				leftIcon={className => <ArrowLeftOnRectangleIcon className={className} />}
			/>
		</Page>
	);
};

type QueryData = GetAccountPageQuery;
type MutationData = UpdateStudentMutation;
type MutationVars = UpdateStudentMutationVariables;

export default AccountPage;
