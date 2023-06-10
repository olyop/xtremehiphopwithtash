import { useLazyQuery, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import {
	FC,
	Fragment,
	PropsWithChildren,
	createElement,
	useContext,
	useEffect,
	useState,
} from "react";

import Button from "../../components/button";
import DetailsForm from "../../components/forms/details-form";
import Modal from "../../components/modal";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import {
	CheckStudentQuery,
	CheckStudentQueryVariables,
	CreateStudentMutation,
	CreateStudentMutationVariables,
	DetailsInput,
} from "../../generated-types";
import CHECK_STUDENT from "./check-student.graphql";
import CREATE_STUDENT from "./create-student.graphql";
import { initialInput } from "./initital-input";

const CreateAccount: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, logout, user, isLoading, loginWithRedirect } = useAuth0();

	const { setIsAdministrator } = useContext(IsAdministratorContext);
	const [hasCreatedAccount, setHasCreatedAccount] = useState(true);

	const [checkStudent] = useLazyQuery<CheckData, CheckVars>(CHECK_STUDENT);

	const [createAccount, createAccountResult] = useMutation<CreateData, CreateVars>(CREATE_STUDENT);

	const [detailsInput, setDetailsInput] = useState<DetailsInput>(initialInput);

	const handleCheck = async () => {
		if (user?.sub) {
			const { data, error } = await checkStudent();

			if (error) {
				void loginWithRedirect();
			} else {
				if (data) {
					setHasCreatedAccount(data.doesStudentExist);
					setIsAdministrator(data.isStudentAdministator);
				}
			}
		}
	};

	const handlePopulateForm = () => {
		if (user) {
			setDetailsInput(prevState => ({
				...prevState,
				firstName: user.given_name ?? prevState.firstName,
				lastName: user.family_name ?? prevState.lastName,
				nickName: user.nickname ?? prevState.nickName,
				mobilePhoneNumber: user.phone_number ?? prevState.mobilePhoneNumber,
				emailAddress: user.email ?? prevState.emailAddress,
			}));
		}
	};

	const handleCreateAccountClick = () => {
		void createAccount({
			variables: {
				input: detailsInput,
			},
		});
	};

	const handleCancel = () => {
		logout({
			logoutParams: {
				returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URL,
			},
		});
	};

	useEffect(() => {
		if (isAuthenticated) {
			void handleCheck();
		}
	}, [isAuthenticated]);

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

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			void loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	return hasCreatedAccount ? (
		<Fragment>{children}</Fragment>
	) : (
		<div className="relative w-screen h-screen">
			<img
				src="/jumbotron.jpg"
				alt="Xtreme Hip-Hop with Tash"
				className="object-cover w-full h-full"
			/>
			<Modal
				isOpen
				isLarge
				centerTitle
				hideCloseButton
				disableCloseOnEscape
				title="Account Setup"
				icon={className => <UserCircleIcon className={className} />}
				contentClassName="flex flex-col gap-4 p-4"
				children={
					<Fragment>
						<h2 className="text-xl font-bold text-center">You&apos;re nearly there!!</h2>
						<h2 className="text-lg text-center">
							Please complete this form
							<br />
							to create your account :)
						</h2>
						<div className="flex flex-col gap-4 pt-4">
							<DetailsForm input={detailsInput} onChange={setDetailsInput} />
						</div>
					</Fragment>
				}
				buttonClassName="justify-center pb-4"
				error={createAccountResult.error}
				errorClassName="px-4 py-2"
				buttons={
					<Fragment>
						<Button
							text="Complete"
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
};

type CheckData = CheckStudentQuery;
type CheckVars = CheckStudentQueryVariables;
type CreateData = CreateStudentMutation;
type CreateVars = CreateStudentMutationVariables;

export default CreateAccount;
