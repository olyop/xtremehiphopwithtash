import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useAuth0 } from "@auth0/auth0-react";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, PropsWithChildren, createElement, useContext, useEffect, useState } from "react";

import Button from "../../components/button";
import DetailsForm from "../../components/forms/details-form";
import FullscreenSpinner from "../../components/fullscreen-spinner";
import Loading from "../../components/loading";
import Modal from "../../components/modal";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import {
	CheckStudentQuery,
	CheckStudentQueryVariables,
	CreateStudentMutation,
	CreateStudentMutationVariables,
	DetailsInput,
} from "../../generated-types";
import Header from "../../layouts/header";
import CHECK_STUDENT from "./check-student.graphql";
import CREATE_STUDENT from "./create-student.graphql";
import { initialInput } from "./initital-input";

const CreateAccount: FC<PropsWithChildren> = ({ children }) => {
	const { setIsAdministrator } = useContext(IsAdministratorContext);
	const { isLoading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

	const [detailsInput, setDetailsInput] = useState<DetailsInput>(initialInput);
	const [hasCreatedAccount, setHasCreatedAccount] = useState<boolean | null>(null);

	const [checkStudent, checkStudentResult] = useLazyQuery<CheckData, CheckVars>(CHECK_STUDENT);
	const [createAccount, createAccountResult] = useMutation<CreateData, CreateVars>(CREATE_STUDENT);

	const handleCheck = async () => {
		if (user?.sub) {
			const { data, error } = await checkStudent({
				fetchPolicy: "network-only",
			});

			if (error) {
				setHasCreatedAccount(null);
				setIsAdministrator(false);
			} else if (data) {
				setHasCreatedAccount(data.doesStudentExist);
				setIsAdministrator(data.isStudentAdministator);
			}
		}
	};

	const handlePopulateForm = () => {
		if (user) {
			const shouldUseNickname = user.nickname ? user.nickname.includes(".") || user.nickname.includes(" ") : false;

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

	const handleCancel = () => {
		void logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	useEffect(() => {
		if (isAuthenticated && hasCreatedAccount === null && !checkStudentResult.loading) {
			void handleCheck();
		}
	}, [isAuthenticated, hasCreatedAccount, checkStudentResult.loading]);

	useEffect(() => {
		const isNotLoading = !isLoading;
		const isNotAuthenticated = !isAuthenticated;

		if (isNotLoading && isNotAuthenticated) {
			void loginWithRedirect({
				authorizationParams: {
					redirect_uri: window.location.origin,
				},
			});
		}
	}, [isLoading, isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated) {
			handlePopulateForm();
		}
	}, [user]);

	useEffect(() => {
		if (createAccountResult.data) {
			setHasCreatedAccount(true);
		}
	}, [createAccountResult.data]);

	if (isLoading || !isAuthenticated || hasCreatedAccount === null) {
		return (
			<div className="h-content-height w-full bg-stone-150 overflow-hidden">
				<Header />
				<div className="h-full flex items-center justify-center">
					<Loading />
				</div>
			</div>
		);
	}

	if (!hasCreatedAccount) {
		return (
			<div className="relative w-screen h-screen">
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
					contentClassName="flex flex-col gap-4 px-4 py-4"
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
								text={createAccountResult.loading ? "Creating..." : "Complete"}
								onClick={handleCreateAccountClick}
								ariaLabel="Create Account"
								rightIcon={className => <PaperAirplaneIcon className={className} />}
							/>
							<Button
								text="Cancel"
								transparent
								onClick={handleCancel}
								ariaLabel="Cancel"
								leftIcon={className => <XCircleIcon className={className} />}
							/>
						</Fragment>
					}
				/>
			</div>
		);
	}

	return <Fragment>{children}</Fragment>;
};

type CheckData = CheckStudentQuery;
type CheckVars = CheckStudentQueryVariables;
type CreateData = CreateStudentMutation;
type CreateVars = CreateStudentMutationVariables;

export default CreateAccount;
