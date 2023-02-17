package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class DetailsValidator implements Validator<UUID, DetailsInput> {

	private final DetailsDAO detailsDAO;

	public DetailsValidator(DetailsDAO detailsDAO) {
		this.detailsDAO = detailsDAO;
	}

	public void validateID(UUID detailsID) {
		if (!detailsDAO.existsByID(detailsID)) {
			throw new ResolverException("Details does not exist");
		}
	}

	public void validateInput(DetailsInput input) {
		String firstName = input.getFirstName();
		String lastName = input.getLastName();
		Optional<String> nickName = input.getNickName();
		String gender = input.getGender();
		String mobilePhoneNumber = input.getMobilePhoneNumber();

		validateNotEmpty(firstName, lastName, nickName);
		validateGender(gender);
		validateMobilePhoneNumber(mobilePhoneNumber);
		validateNameIsUnique(firstName, lastName, nickName);
	}

	private void validateNotEmpty(String firstName, String lastName, Optional<String> nickName) {
		if (firstName.isEmpty()) {
			throw new ResolverException("First name cannot be empty");
		}

		if (lastName.isEmpty()) {
			throw new ResolverException("Last name cannot be empty");
		}

		if (nickName.isPresent() && nickName.get().isEmpty()) {
			throw new ResolverException("Nick name cannot be empty");
		}
	}

	private void validateGender(String gender) {
		if (!detailsDAO.selectGenders().contains(gender)) {
			throw new ResolverException("Gender does not exist");
		}
	}

	private void validateMobilePhoneNumber(String mobilePhoneNumber) {
		if (mobilePhoneNumber.length() != 10) {
			throw new ResolverException("Invalid phone number");
		}

		if (!mobilePhoneNumber.startsWith("04")) {
			throw new ResolverException("Invalid phone number - must be a mobile phone number");
		}
	}

	private void validateNameIsUnique(String firstName, String lastName, Optional<String> nickName) {
		if (detailsDAO.existsByNames(firstName, lastName, nickName.get())) {
			throw new ResolverException("Details already exists");
		}
	}
}
