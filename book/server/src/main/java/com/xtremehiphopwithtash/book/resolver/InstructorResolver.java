package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
import com.xtremehiphopwithtash.book.service.DetailsService;
import com.xtremehiphopwithtash.book.service.InstructorService;
import com.xtremehiphopwithtash.book.service.auth0jwt.Auth0JwtService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class InstructorResolver {

	private final InstructorService instructorService;
	private final DetailsService detailsService;
	private final Auth0JwtService auth0JwtService;

	public InstructorResolver(
		InstructorService instructorService,
		DetailsService detailsService,
		Auth0JwtService auth0JwtService
	) {
		this.instructorService = instructorService;
		this.detailsService = detailsService;
		this.auth0JwtService = auth0JwtService;
	}

	@MutationMapping
	public Instructor createInstructor(@Argument InstructorInput input, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return instructorService.create(input);
	}

	@MutationMapping
	public Instructor updateInstructorByID(
		@Argument UUID instructorID,
		@Argument InstructorInput input,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);

		return instructorService.updateByID(instructorID, input);
	}

	@MutationMapping
	public UUID deleteInstructorByID(@Argument UUID instructorID, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return instructorService.deleteByID(instructorID);
	}

	@QueryMapping
	public List<Instructor> getInstructors(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		List<Instructor> instructors = instructorService.retreiveAll();

		return instructors.isEmpty() ? null : instructors;
	}

	@QueryMapping
	public Instructor getInstructorByID(@Argument UUID instructorID) {
		return instructorService.retreiveByID(instructorID);
	}

	@SchemaMapping(typeName = "Instructor", field = "details")
	public Details getInstructorDetails(Instructor instructor) {
		return detailsService.retreiveByID(instructor.getDetailsID());
	}
}
