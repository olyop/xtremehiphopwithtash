import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { FC, Fragment, createElement } from "react";

import { Details, GetAccountPageQuery } from "../../generated-types";
import { createdAtFormatter } from "../../helpers/intl";
import PageWithHeaderAndData from "../page-with-header-and-data";
import GET_ACCOUNT_PAGE from "./get-account-page.graphql";
import AccountUpdate from "./update";

const AccountPage: FC = () => {
	const accountPageResult = useQuery<GetAccountPageQuery>(GET_ACCOUNT_PAGE);

	const handleOnUpdate = () => {
		void accountPageResult.refetch();
	};

	return (
		<PageWithHeaderAndData title="My Account" contentClassName="flex flex-col gap-4" queryResult={accountPageResult}>
			{({ getStudentByID: { details, createdAt } }) => (
				<Fragment>
					<h2 className="text-2xl underline">Details</h2>
					<div className="flex flex-col gap-2 p-2 border rounded">
						<p>
							Name:{" "}
							<span className="text-gray-500">
								{details.firstName} {details.lastName}
							</span>
						</p>
						{details.nickName && (
							<p>
								Nick Name: <span className="text-gray-500">{details.nickName}</span>
							</p>
						)}
						<p>
							Mobile Number: <span className="text-gray-500">{details.mobilePhoneNumber}</span>
						</p>
						<p>
							Email: <span className="text-gray-500">{details.emailAddress}</span>
						</p>
						{details.instagramUsername && (
							<p>
								Instagram: <span className="text-gray-500">{details.instagramUsername}</span>
							</p>
						)}
						<p>
							Created: <span className="text-gray-500">{createdAtFormatter.format(createdAt)}</span>
						</p>
					</div>
					<div className="flex gap-2">
						<AccountUpdate details={details as Details} onUpdate={handleOnUpdate} />
					</div>
				</Fragment>
			)}
		</PageWithHeaderAndData>
	);
};

export default AccountPage;
