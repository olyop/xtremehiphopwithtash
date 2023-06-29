import { ApolloClient, ApolloError } from "@apollo/client";

import { BookingInput, GetCheckSessionQuery, GetCheckSessionQueryVariables } from "../../../generated-types";
import CHECK_SESSION from "./check-session.graphql";

export const checkCanBookSession = async (
	apollo: ApolloClient<unknown>,
	input: BookingInput,
): Promise<boolean | ApolloError> => {
	try {
		const { data, error } = await apollo.query<GetCheckSessionQuery, GetCheckSessionQueryVariables>({
			query: CHECK_SESSION,
			variables: {
				sessionID: input.sessionID,
				bookingQuantity: input.bookingQuantity,
				equipmentQuantity: input.equipmentQuantity,
			},
		});

		if (error) {
			return error;
		}

		const { isCancelled, isCapacityRemaining, isEquipmentRemaining } = data.getSessionByID;

		if (isCancelled) {
			return new ApolloError({ errorMessage: "This session has been cancelled." });
		}

		if (!isCapacityRemaining) {
			return new ApolloError({ errorMessage: "This session is fully booked." });
		}

		if (!isEquipmentRemaining) {
			return new ApolloError({ errorMessage: "There is not enough steps available for this session." });
		}

		return true;
	} catch (error) {
		if (error instanceof ApolloError) {
			return error;
		} else {
			return false;
		}
	}
};
