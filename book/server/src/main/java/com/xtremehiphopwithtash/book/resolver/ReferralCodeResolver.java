package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.ReferralCodeDAO;
import com.xtremehiphopwithtash.book.model.ReferralCode;
import com.xtremehiphopwithtash.book.resolver.validator.ReferralCodeValidator;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ReferralCodeResolver {

	private final ReferralCodeDAO referralCodeDAO;
	private final ReferralCodeValidator referralCodeValidator;

	public ReferralCodeResolver(
		ReferralCodeDAO referralCodeDAO,
		ReferralCodeValidator referralCodeValidator
	) {
		this.referralCodeDAO = referralCodeDAO;
		this.referralCodeValidator = referralCodeValidator;
	}

	@MutationMapping
	public String generateReferralCode() {
		String code = generateCode();

		referralCodeValidator.validateCodeIsUnique(code);

		ReferralCode referralCode = new ReferralCode();
		referralCode.setCode(generateCode());

		return referralCodeDAO.insert(referralCode).getCode();
	}

	@QueryMapping
	public boolean verifyReferralCode(@Argument String code) {
		return (
			referralCodeDAO.existsByID(code) && referralCodeDAO.selectByID(code).get().getUsedAt() == null
		);
	}

	private String generateCode() {
		UUID uuid = UUID.randomUUID();
		String uuidNoDashes = uuid.toString().replace("-", "");
		List<String> characters = Arrays.asList(uuidNoDashes.split(""));
		Collections.shuffle(characters);
		uuidNoDashes = String.join("", characters);
		return uuidNoDashes.substring(0, 9).toUpperCase();
	}
}
