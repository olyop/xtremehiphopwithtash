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
		String firstName = input.getFirstName();
		String lastName = input.getLastName();
		Optional<String> nickName = input.getNickName();

		if (nickName.isPresent()) {
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
