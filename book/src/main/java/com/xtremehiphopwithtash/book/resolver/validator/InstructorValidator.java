package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
import java.net.URL;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class InstructorValidator implements Validator<UUID, InstructorInput> {

	private final InstructorDAO instructorDAO;
	private final CommonValidator commonValidator;
	private final DetailsValidator detailsValidator;

	public InstructorValidator(
		InstructorDAO instructorDAO,
		CommonValidator commonValidator,
		DetailsValidator detailsValidator
	) {
		this.instructorDAO = instructorDAO;
		this.commonValidator = commonValidator;
		this.detailsValidator = detailsValidator;
	}

	public void validateID(UUID instructorID) {
		if (!instructorDAO.existsByID(instructorID)) {
			throw new ResolverException("Instructor does not exist");
		}
	}

	public void validateInput(InstructorInput input) {
		URL photo = input.getPhoto();
		DetailsInput detailsInput = input.getDetails();

		commonValidator.validateURL(photo);
		detailsValidator.validateInput(detailsInput);
	}
}
