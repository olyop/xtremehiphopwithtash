import { ApolloClient } from "@apollo/client";

import { VerifyReferralCodeQuery, VerifyReferralCodeQueryVariables } from "../../generated-types";
import VERIFY_REFERRAL_CODE from "./verify-referral-code.graphql";

export const verifyReferralCode = (apollo: ApolloClient<unknown>) => async (code: string) => {
	const { data } = await apollo.query<VerifyReferralCodeQuery, VerifyReferralCodeQueryVariables>({
		query: VERIFY_REFERRAL_CODE,
		variables: {
			code,
		},
	});

	return data.verifyReferralCode;
};
