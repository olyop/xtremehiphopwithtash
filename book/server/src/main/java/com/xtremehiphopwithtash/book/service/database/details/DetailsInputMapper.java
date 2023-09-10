package com.xtremehiphopwithtash.book.service.database.details;

import com.xtremehiphopwithtash.book.graphql.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.helpers.CommonTransform;
import com.xtremehiphopwithtash.book.service.helpers.InputMapper;
import org.springframework.stereotype.Component;

@Component
public class DetailsInputMapper implements InputMapper<DetailsInput, Details> {

	@Override
	public Details map(DetailsInput input) {
		Details details = new Details();

		details.setFirstName(CommonTransform.transformName(input.firstName()));
		details.setLastName(CommonTransform.transformName(input.lastName()));
		details.setNickName(CommonTransform.transformName(input.nickName()));
		details.setGender(input.gender().orElse(null));
		details.setMobilePhoneNumber(CommonTransform.transformMobilePhoneNumber(input.mobilePhoneNumber()));
		details.setEmailAddress(CommonTransform.transformText(input.emailAddress()));
		details.setInstagramUsername(CommonTransform.transformToLower(input.instagramUsername()));

		return details;
	}
}
