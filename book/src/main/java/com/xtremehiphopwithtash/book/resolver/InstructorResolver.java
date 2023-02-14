package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.resolver.input.CreateInstructorInput;
import com.xtremehiphopwithtash.book.util.ValidationUtil;
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

	public InstructorResolver(InstructorDAO instructorDAO, DetailsDAO detailsDAO) {
		this.instructorDAO = instructorDAO;
		this.detailsDAO = detailsDAO;
	}

	@QueryMapping
	public List<Instructor> getInstructors() {
		return instructorDAO.select();
	}

	@QueryMapping
	public Optional<Instructor> getInstructorByID(@Argument UUID id) {
		return instructorDAO.selectByID(id);
	}

	@SchemaMapping(typeName = "Instructor", field = "details")
	public Optional<Details> getInstructorDetails(Instructor instructor) {
		return detailsDAO.selectByID(instructor.getDetailsID());
	}

	@MutationMapping
	public Instructor createInstructor(@Argument CreateInstructorInput input) {
		URL photo = input.getPhoto();
		String firstName = input.getDetails().getFirstName();
		String lastName = input.getDetails().getLastName();
		String nickName = input.getDetails().getNickName();
		String mobilePhoneNumber = input.getDetails().getMobilePhoneNumber();
		String gender = input.getDetails().getGender();

		if (!detailsDAO.selectGenders().contains(gender)) {
			throw new IllegalArgumentException("Gender does not exist");
		}

		if (!mobilePhoneNumber.startsWith("04")) {
			throw new IllegalArgumentException("Invalid mobile phone number");
		}

		if (!ValidationUtil.validateURL(photo)) {
			throw new IllegalArgumentException("Invalid photo URL");
		}

		if (detailsDAO.existsByNames(firstName, lastName, nickName)) {
			throw new IllegalArgumentException("Instructor with name already exists");
		}

		Details details = new Details();
		details.setFirstName(firstName);
		details.setLastName(lastName);
		details.setNickName(nickName);
		details.setMobilePhoneNumber(mobilePhoneNumber);
		details.setGender(gender);

		Details savedDetails = detailsDAO.insert(details);

		Instructor instructor = new Instructor();
		instructor.setPhoto(photo);
		instructor.setDetailsID(savedDetails.getDetailsID());

		return instructorDAO.insert(instructor);
	}
}
