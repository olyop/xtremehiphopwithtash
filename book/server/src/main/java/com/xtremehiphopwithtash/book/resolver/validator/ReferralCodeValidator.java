package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.ReferralCodeDAO;
import org.springframework.stereotype.Component;

@Component
public class ReferralCodeValidator implements ValidatorBase<String> {

	private final ReferralCodeDAO referralCodeDAO;
	private final CommonValidator commonValidator;

	public ReferralCodeValidator(ReferralCodeDAO referralCodeDAO, CommonValidator commonValidator) {
		this.referralCodeDAO = referralCodeDAO;
		this.commonValidator = commonValidator;
	}

	public void validateText(String code) {
		commonValidator.validateText(code, "Referral code", 9);
	}

	@Override
	public void validateID(String code) {
		if (!referralCodeDAO.existsByID(code)) {
			throw new ResolverException("Referral code does not exist.");
		}
	}

	public void validateCodeIsUnique(String code) {
		if (referralCodeDAO.existsByID(code)) {
			throw new ResolverException("Referral code is not unique.");
		}
	}

	public void validateCodeNotUsed(String code) {
		if (referralCodeDAO.selectByID(code).get().getUsedAt() != null) {
			throw new ResolverException("Referral code has already been used.");
		}
	}
}
