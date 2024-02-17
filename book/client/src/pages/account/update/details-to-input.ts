import { Details, DetailsInput } from "../../../generated-types";

export const detailsToInput = ({
	firstName,
	lastName,
	nickName,
	gender,
	mobilePhoneNumber,
	emailAddress,
	instagramUsername,
}: Details): DetailsInput => ({
	firstName,
	lastName,
	nickName,
	gender,
	mobilePhoneNumber,
	emailAddress,
	instagramUsername,
});
