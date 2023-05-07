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

const CreateAccount: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, logout, user } = useAuth0();
	const { setIsAdministrator } = useContext(IsAdministratorContext);
	const [hasCreatedAccount, setHasCreatedAccount] = useState(true);

	const [checkStudent] = useLazyQuery<CheckData, CheckVars>(CHECK_STUDENT);
	const [createAccount, { error }] = useMutation<CreateData, CreateVars>(CREATE_STUDENT);

	const [detailsInput, setDetailsInput] = useState<DetailsInput>({
		firstName: "",
		nickName: null,
		lastName: "",
		gender: null,
		mobilePhoneNumber: "",
		instagramUsername: null,
	});

	const handleCheck = async () => {
		if (isAuthenticated && user?.sub) {
			const { data } = await checkStudent({
				variables: {
					studentID: user.sub,
				},
			});

			if (data) {
				setHasCreatedAccount(data.doesStudentExist);
				setIsAdministrator(data.isStudentAdministator);
			}
		}
	};

	const handlePopulateForm = () => {
		if (user) {
			setDetailsInput(prevState => ({
				...prevState,
				firstName: user.given_name ?? prevState.firstName,
				lastName: user.family_name ?? prevState.lastName,
				mobilePhoneNumber: user.phone_number ?? prevState.mobilePhoneNumber,
			}));
		}
	};

	const handleCreateAccount = async () => {
		if (user?.sub) {
			const { data } = await createAccount({
				variables: {
					studentID: user.sub,
					input: detailsInput,
				},
			});

			if (data) {
				setHasCreatedAccount(true);
			}
		}
	};

	const handleCreateAccountClick = () => {
		void handleCreateAccount();
	};

	const handleCancel = () => {
		logout();
	};

	useEffect(() => {
		void handleCheck();
	}, [isAuthenticated]);

	useEffect(() => {
		handlePopulateForm();
	}, [user]);

	return hasCreatedAccount ? (
		<Fragment>{children}</Fragment>
	) : (
		<div className="relative w-screen h-screen">
			<img
				src="/jumbotron.jpg"
				alt="Xtreme Hip Hop with Tash"
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
				error={error}
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
