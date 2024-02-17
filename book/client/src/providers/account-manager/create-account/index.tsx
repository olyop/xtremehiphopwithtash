import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useAuth0 } from "@auth0/auth0-react";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import DetailsForm from "../../../components/forms/details-form";
import FullscreenSpinner from "../../../components/fullscreen-spinner";
import Modal from "../../../components/modal";
import { CreateStudentMutation, CreateStudentMutationVariables } from "../../../generated-types";
import CREATE_STUDENT from "./create-student.graphql";
import { initialInput } from "./initital-input";

const CreateAccount: FC<Props> = ({ onCreateAccount }) => {
	const { isAuthenticated, logout, user } = useAuth0();

	const [detailsInput, setDetailsInput] = useState(initialInput);

	const [createAccount, createAccountResult] = useMutation<CreateData, CreateVars>(CREATE_STUDENT);

	const handleCreateAccountClick = () => {
		if (!createAccountResult.loading) {
			void createAccount({
				variables: {
					input: {
						...detailsInput,
						firstName: detailsInput.firstName.trim(),
						lastName: detailsInput.lastName.trim(),
						nickName: detailsInput.nickName ? detailsInput.nickName.trim() : null,
						mobilePhoneNumber: detailsInput.mobilePhoneNumber.trim(),
						emailAddress: detailsInput.emailAddress.trim(),
						instagramUsername: detailsInput.instagramUsername ? detailsInput.instagramUsername.trim() : null,
					},
				},
			});
		}
	};

	const handlePopulateForm = () => {
		if (user) {
			const shouldUseNickname = user.nickname ? !user.nickname.includes(".") || !user.nickname.includes(" ") : false;

			setDetailsInput(prevState => ({
				...prevState,
				firstName: user.given_name ?? prevState.firstName,
				lastName: user.family_name ?? prevState.lastName,
				nickName: user.nickname === undefined || shouldUseNickname ? prevState.nickName : user.nickname,
				mobilePhoneNumber: user.phone_number ?? prevState.mobilePhoneNumber,
				emailAddress: user.email ?? prevState.emailAddress,
			}));
		}
	};

	const handleCancel = () => {
		void logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	useEffect(() => {
		if (user && isAuthenticated) {
			handlePopulateForm();
		}
	}, [user, isAuthenticated]);

	useEffect(() => {
		if (createAccountResult.data) {
			onCreateAccount();
		}
	}, [createAccountResult.data]);

	return (
		<div className="relative w-full h-full">
			<img src="/images/jumbotron.jpg" alt="Xtreme Hip-Hop with Tash" className="object-cover w-full h-full" />
			<FullscreenSpinner isLoading={createAccountResult.loading} className="z-[200]" />
			<Modal
				isOpen
				isLarge
				centerTitle
				hideCloseButton
				disableCloseOnEscape
				title="Account Setup"
				backgroundClassName="cursor-default"
				contentClassName="flex flex-col gap-4 p-0 sm:p-4"
				icon={className => <UserCircleIcon className={className} />}
				children={
					<Fragment>
						<h2 className="text-xl font-bold text-center">You&apos;re nearly there!!</h2>
						<h2 className="text-lg text-center">
							Please complete this form
							<br />
							to create your account :)
						</h2>
						<div className="flex flex-col gap-4 pt-4">
							<DetailsForm input={detailsInput} onChange={setDetailsInput} isCreateAccount />
						</div>
					</Fragment>
				}
				buttonClassName="justify-center pb-4"
				error={createAccountResult.error}
				errorClassName="px-4 py-2"
				buttons={
					<Fragment>
						<Button
							ariaLabel="Create Account"
							onClick={handleCreateAccountClick}
							text={createAccountResult.loading ? "Creating..." : "Complete"}
							rightIcon={className => <PaperAirplaneIcon className={className} />}
						/>
						<Button
							transparent
							text="Cancel"
							ariaLabel="Cancel"
							onClick={handleCancel}
							leftIcon={className => <XCircleIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</div>
	);
};

interface Props {
	onCreateAccount: () => void;
}

type CreateData = CreateStudentMutation;
type CreateVars = CreateStudentMutationVariables;

export default CreateAccount;