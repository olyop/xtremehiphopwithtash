import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement, useEffect, useState } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import { IsCreatingAccountContext } from "../../contexts/is-creating-account";
import { CheckStudentQuery, CheckStudentQueryVariables } from "../../generated-types";
import Welcome from "../../layouts/welcome";
import CHECK_STUDENT from "./check-student.graphql";
import Container from "./container";
import CreateAccount from "./create-account";
import InstallPopup from "./install-popup";
import Loading from "./loading";

const AccountManager: FC<PropsWithChildren> = ({ children }) => {
	const { isLoading, isAuthenticated, user } = useAuth0();

	const [studentChecks, setStudentChecks] = useState<StudentChecks | null>(null);

	const [checkStudent] = useLazyQuery<CheckData, CheckVars>(CHECK_STUDENT);

	const handleCheck = async () => {
		if (user?.sub) {
			const result = await checkStudent();

			const { data } = result;

			setStudentChecks(
				data
					? {
							doesStudentExist: data.doesStudentExist,
							isStudentAdministrator: data.isStudentAdministrator,
							shouldShowInstallPopup: data.shouldShowInstallPopup,
						}
					: null,
			);
		}
	};

	const handleCreateAccount = () => {
		void handleCheck();
	};

	useEffect(() => {
		if (isAuthenticated && user && studentChecks === null) {
			void handleCheck();
		}
	}, [isAuthenticated, user, studentChecks]);

	const isAuthenticatedAndUser = isAuthenticated && user !== undefined;

	return isAuthenticatedAndUser ? (
		studentChecks === null ? (
			<Container shouldFetchAccount={false}>
				<Loading />
			</Container>
		) : studentChecks.doesStudentExist ? (
			<IsCreatingAccountContext.Provider value={studentChecks.doesStudentExist}>
				<IsAdministratorContext.Provider value={studentChecks.isStudentAdministrator}>
					<InstallPopup shouldShowInstallPopup={studentChecks.shouldShowInstallPopup}>
						<Container>{children}</Container>
					</InstallPopup>
				</IsAdministratorContext.Provider>
			</IsCreatingAccountContext.Provider>
		) : (
			<Container shouldFetchAccount={false}>
				<CreateAccount onCreateAccount={handleCreateAccount} />
			</Container>
		)
	) : isLoading ? (
		<Container shouldFetchAccount={false}>
			<Loading />
		</Container>
	) : (
		<Container shouldFetchAccount={false}>
			<Welcome />
		</Container>
	);
};

interface StudentChecks {
	isStudentAdministrator: boolean;
	doesStudentExist: boolean;
	shouldShowInstallPopup: boolean;
}

type CheckData = CheckStudentQuery;
type CheckVars = CheckStudentQueryVariables;

export default AccountManager;
