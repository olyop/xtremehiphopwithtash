package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.ReferralCodeDAO;
import org.springframework.stereotype.Component;

@Component
public class ReferralCodeValidator implements ValidatorBase<String> {

	private final ReferralCodeDAO referralCodeDAO;

	public ReferralCodeValidator(ReferralCodeDAO referralCodeDAO) {
		this.referralCodeDAO = referralCodeDAO;
	}

	public void validateNotEmpty(String code) {
		if (code.isEmpty()) {
			throw new ResolverException("Referral code is required.");
		}
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
