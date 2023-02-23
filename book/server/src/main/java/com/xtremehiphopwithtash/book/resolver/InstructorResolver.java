package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
import com.xtremehiphopwithtash.book.resolver.transformer.CommonTransformer;
import com.xtremehiphopwithtash.book.resolver.validator.DetailsValidator;
import com.xtremehiphopwithtash.book.resolver.validator.InstructorValidator;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class InstructorResolver {

	private final InstructorDAO instructorDAO;
	private final DetailsDAO detailsDAO;
	private final InstructorValidator instructorValidator;
	private final DetailsValidator detailsValidator;

	public InstructorResolver(
		InstructorDAO instructorDAO,
		DetailsDAO detailsDAO,
		InstructorValidator instructorValidator,
		DetailsValidator detailsValidator
	) {
		this.instructorDAO = instructorDAO;
		this.detailsDAO = detailsDAO;
		this.instructorValidator = instructorValidator;
		this.detailsValidator = detailsValidator;
	}

	@QueryMapping
	public List<Instructor> getInstructors() {
		return instructorDAO.select();
	}

	@QueryMapping
	public Optional<Instructor> getInstructorByID(@Argument UUID instructorID) {
		return instructorDAO.selectByID(instructorID);
	}

	@SchemaMapping(typeName = "Instructor", field = "details")
	public Optional<Details> getInstructorDetails(Instructor instructor) {
		return detailsDAO.selectByID(instructor.getDetailsID());
	}

	@MutationMapping
	public Instructor createInstructor(@Argument InstructorInput input) {
		URL photo = input.getPhoto();
		String firstName = CommonTransformer.transformName(input.getDetails().getFirstName());
		String lastName = CommonTransformer.transformName(input.getDetails().getLastName());
		Optional<String> nickName = CommonTransformer.transformName(input.getDetails().getNickName());
		String gender = input.getDetails().getGender();
		String mobilePhoneNumber = input.getDetails().getMobilePhoneNumber();

		instructorValidator.validateInput(input);
		detailsValidator.validateNameIsUnique(input.getDetails());

		Details details = new Details();
		details.setFirstName(firstName);
		details.setLastName(lastName);
		details.setNickName(nickName.orElse(null));
		details.setGender(gender);
		details.setMobilePhoneNumber(mobilePhoneNumber);

		Details savedDetails = detailsDAO.insert(details);

		Instructor instructor = new Instructor();
		instructor.setPhoto(photo);
		instructor.setDetailsID(savedDetails.getDetailsID());

		return instructorDAO.insert(instructor);
	}

	@MutationMapping
	public UUID deleteInstructorByID(@Argument UUID instructorID) {
		instructorValidator.validateID(instructorID);
		instructorValidator.validateCanDelete(instructorID);

		Optional<Instructor> instructor = instructorDAO.selectByID(instructorID);

		instructorDAO.deleteByID(instructorID);
		detailsDAO.deleteByID(instructor.get().getDetailsID());

		return instructorID;
	}

	@MutationMapping
	public Instructor updateInstructorByID(
		@Argument UUID instructorID,
		@Argument InstructorInput input
	) {
		URL photo = input.getPhoto();
		String firstName = CommonTransformer.transformName(input.getDetails().getFirstName());
		String lastName = CommonTransformer.transformName(input.getDetails().getLastName());
		Optional<String> nickName = CommonTransformer.transformName(input.getDetails().getNickName());
		String gender = input.getDetails().getGender();
		String mobilePhoneNumber = input.getDetails().getMobilePhoneNumber();

		instructorValidator.validateID(instructorID);
		instructorValidator.validateInput(input);

		Instructor instructor = instructorDAO.selectByID(instructorID).get();
		instructor.setPhoto(photo);

		Details details = new Details();
		details.setFirstName(firstName);
		details.setLastName(lastName);
		details.setNickName(nickName.orElse(null));
		details.setGender(gender);
		details.setMobilePhoneNumber(mobilePhoneNumber);

		instructorDAO.updateByID(instructorID, instructor);
		detailsDAO.updateByID(instructor.getDetailsID(), details);

		return instructor;
	}

	@QueryMapping
	public List<String> getGenders() {
		return detailsDAO.selectGenders();
	}
}
