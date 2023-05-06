package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
import com.xtremehiphopwithtash.book.resolver.mapper.DetailsInputMapper;
import com.xtremehiphopwithtash.book.resolver.mapper.InstructorInputMapper;
import com.xtremehiphopwithtash.book.resolver.transform.CommonTransform;
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

	private final InstructorInputMapper instructorInputMapper;
	private final DetailsInputMapper detailsInputMapper;
	private final InstructorDAO instructorDAO;
	private final DetailsDAO detailsDAO;
	private final InstructorValidator instructorValidator;

	public InstructorResolver(
		InstructorInputMapper instructorInputMapper,
		DetailsInputMapper detailsInputMapper,
		InstructorDAO instructorDAO,
		DetailsDAO detailsDAO,
		InstructorValidator instructorValidator
	) {
		this.instructorInputMapper = instructorInputMapper;
		this.detailsInputMapper = detailsInputMapper;
		this.instructorDAO = instructorDAO;
		this.detailsDAO = detailsDAO;
		this.instructorValidator = instructorValidator;
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
		instructorValidator.validateCreate(input);

		Details details = detailsInputMapper.map(input.details());

		Details savedDetails = detailsDAO.insert(details);

		Instructor instructor = instructorInputMapper.map(input);
		instructor.setDetailsID(savedDetails.getDetailsID());

		return instructorDAO.insert(instructor);
	}

	@MutationMapping
	public Instructor updateInstructorByID(
		@Argument UUID instructorID,
		@Argument InstructorInput input
	) {
		instructorValidator.validateUpdate(instructorID, input);

		Instructor currentInstructor = instructorDAO.selectByID(instructorID).get();
		currentInstructor.setPhoto(input.photo());

		Details details = detailsInputMapper.map(input.details());

		instructorDAO.updateByID(instructorID, currentInstructor);
		detailsDAO.updateByID(currentInstructor.getDetailsID(), details);

		return currentInstructor;
	}

	@MutationMapping
	public UUID deleteInstructorByID(@Argument UUID instructorID) {
		instructorValidator.validateDelete(instructorID);

		Optional<Instructor> instructor = instructorDAO.selectByID(instructorID);

		instructorDAO.deleteByID(instructorID);
		detailsDAO.deleteByID(instructor.get().getDetailsID());

		return instructorID;
	}

	@QueryMapping
	public List<String> getGenders() {
		return detailsDAO.selectGenders();
	}
}
