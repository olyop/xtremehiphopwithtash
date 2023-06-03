package com.xtremehiphopwithtash.book.service.inputmapper;

import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.inputmapper.transform.CommonTransform;
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
		details.setMobilePhoneNumber(CommonTransform.transformText(input.mobilePhoneNumber()));
		details.setEmailAddress(CommonTransform.transformText(input.emailAddress()));
		details.setInstagramUsername(CommonTransform.transformText(input.instagramUsername()));

		return details;
	}
}
