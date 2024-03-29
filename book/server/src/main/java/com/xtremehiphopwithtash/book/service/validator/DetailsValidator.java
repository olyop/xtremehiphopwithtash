package com.xtremehiphopwithtash.book.service.validator;

import com.xtremehiphopwithtash.book.graphql.input.DetailsInput;
import com.xtremehiphopwithtash.book.service.database.details.DetailsDAO;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class DetailsValidator implements Validator<UUID, DetailsInput> {

	private final DetailsDAO detailsDAO;
	private final CommonValidator commonValidator;

	public DetailsValidator(DetailsDAO detailsDAO, CommonValidator commonValidator) {
		this.detailsDAO = detailsDAO;
		this.commonValidator = commonValidator;
	}

	@Override
	public void validateID(UUID detailsID) {
		if (!detailsDAO.existsByID(detailsID)) {
			throw new ResolverException("Details does not exist");
		}
	}

	@Override
	public void validateInput(DetailsInput input) {
		commonValidator.validateText(input.firstName(), "First Name", 255);
		commonValidator.validateText(input.lastName(), "Last Name", 255);
		commonValidator.validateText(input.nickName(), "Nick Name", 255);
		commonValidator.validateText(input.mobilePhoneNumber(), "Mobile Number", 14);
		commonValidator.validateText(input.emailAddress(), "Email Address", 255);
		validateGender(input);
		validateMobilePhoneNumber(input);
		validateEmailAddress(input);
		validateInstagramUsername(input);
	}

	private void validateGender(DetailsInput input) {
		if (input.gender().isPresent()) {
			if (!detailsDAO.selectGenders().contains(input.gender().get())) {
				throw new ResolverException("Gender does not exist");
			}
		}
	}

	private void validateMobilePhoneNumber(DetailsInput input) {
		String mobilePhoneNumber = input.mobilePhoneNumber();

		if (mobilePhoneNumber.length() == 10) {
			if (!mobilePhoneNumber.startsWith("04")) {
				throw new ResolverException("Invalid mobile number - must start with 04");
			}
			if (!mobilePhoneNumber.matches("^[0-9]*$")) {
				throw new ResolverException("Invalid mobile number - must only contain numbers");
			}
		} else if (mobilePhoneNumber.length() == 12) {
			if (!mobilePhoneNumber.startsWith("04")) {
				throw new ResolverException("Invalid mobile number - must start with 04");
			}
			if (mobilePhoneNumber.charAt(4) != ' ' || mobilePhoneNumber.charAt(8) != ' ') {
				throw new ResolverException("Invalid mobile number - must contain two spaces");
			}
		} else if (mobilePhoneNumber.length() == 13) {
			if (!mobilePhoneNumber.startsWith("+61 4")) {
				throw new ResolverException("Invalid mobile number - must start with +61 4");
			}
			if (!mobilePhoneNumber.substring(4).matches("^[0-9]*$")) {
				throw new ResolverException("Invalid mobile number - must only contain numbers");
			}
		} else if (mobilePhoneNumber.length() == 14) {
			if (!mobilePhoneNumber.startsWith("+61 04")) {
				throw new ResolverException("Invalid mobile number - must start with 04");
			}
			if (!mobilePhoneNumber.substring(4).matches("^[0-9]*$")) {
				throw new ResolverException("Invalid mobile number - must only contain numbers");
			}
		} else {
			throw new ResolverException("Invalid mobile number");
		}
	}

	private void validateEmailAddress(DetailsInput input) {
		if (!input.emailAddress().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
			throw new ResolverException("Invalid email address");
		}
	}

	private void validateInstagramUsername(DetailsInput input) {
		if (input.instagramUsername().isPresent()) {
			String username = input.instagramUsername().get();

			if (!username.matches("^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){0,28}(?:[A-Za-z0-9_]))?)$")) {
				throw new ResolverException("Invalid instagram username");
			}
		}
	}
}
