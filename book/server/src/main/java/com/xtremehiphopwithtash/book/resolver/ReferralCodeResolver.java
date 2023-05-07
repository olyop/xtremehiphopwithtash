package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.ReferralCodeDAO;
import com.xtremehiphopwithtash.book.model.ReferralCode;
import com.xtremehiphopwithtash.book.resolver.validator.ReferralCodeValidator;
import com.xtremehiphopwithtash.book.service.ReferralCodeService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ReferralCodeResolver {

	private final ReferralCodeDAO referralCodeDAO;
	private final ReferralCodeValidator referralCodeValidator;
	private final ReferralCodeService referralCodeGenerator;

	public ReferralCodeResolver(
		ReferralCodeDAO referralCodeDAO,
		ReferralCodeValidator referralCodeValidator,
		ReferralCodeService referralCodeGenerator
	) {
		this.referralCodeDAO = referralCodeDAO;
		this.referralCodeValidator = referralCodeValidator;
		this.referralCodeGenerator = referralCodeGenerator;
	}

	@MutationMapping
	public String generateReferralCode() {
		String code = referralCodeGenerator.generate();

		referralCodeValidator.validateCodeIsUnique(code);

		ReferralCode referralCode = new ReferralCode();
		referralCode.setCode(code);

		return referralCodeDAO.insert(referralCode).getCode();
	}

	@QueryMapping
	public boolean verifyReferralCode(@Argument String code) {
		return (
			referralCodeDAO.existsByID(code) && referralCodeDAO.selectByID(code).get().getUsedAt() == null
		);
	}
}
