package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import java.util.Optional;
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

	public void validateInput(DetailsInput input) {
		commonValidator.validateText(input.firstName(), "First Name", 255);
		commonValidator.validateText(input.lastName(), "Last Name", 255);
		commonValidator.validateText(input.nickName(), "Nick Name", 255);
		commonValidator.validateText(input.instagramUsername(), "Instagram Username", 255);
		validateGender(input);
		validateMobilePhoneNumber(input);
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
				throw new ResolverException("Invalid phone number - must be a mobile phone number");
			}
			if (!mobilePhoneNumber.matches("^[0-9]*$")) {
				throw new ResolverException("Invalid phone number - must only contain numbers");
			}
		} else if (mobilePhoneNumber.length() == 13) {
			if (!mobilePhoneNumber.startsWith("+61 4")) {
				throw new ResolverException("Invalid phone number - must be a mobile phone number");
			}
			if (!mobilePhoneNumber.substring(4).matches("^[0-9]*$")) {
				throw new ResolverException("Invalid phone number - must only contain numbers");
			}
		} else if (mobilePhoneNumber.length() == 14) {
			if (!mobilePhoneNumber.startsWith("+61 04")) {
				throw new ResolverException("Invalid phone number - must be a mobile phone number");
			}
			if (!mobilePhoneNumber.substring(4).matches("^[0-9]*$")) {
				throw new ResolverException("Invalid phone number - must only contain numbers");
			}
		} else {
			throw new ResolverException("Invalid mobile phone number");
		}
	}

	public void validateNameIsUnique(DetailsInput input) {
		String firstName = input.firstName();
		String lastName = input.lastName();
		Optional<String> nickName = input.nickName();

		if (input.nickName().isPresent()) {
			if (detailsDAO.existsByFirstLastNickName(firstName, lastName, nickName.get())) {
				throw new ResolverException("Details already exists");
			}
		} else {
			if (detailsDAO.existsByFirstLastName(firstName, lastName)) {
				throw new ResolverException("Details already exists");
			}
		}
	}
}
