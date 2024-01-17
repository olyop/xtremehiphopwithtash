package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.service.database.classdescription.ClassDescriptionService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class ClassDescriptionResolver {

	private final ClassDescriptionService classDescriptionService;
	private final Auth0JwtService auth0JwtService;

	public ClassDescriptionResolver(ClassDescriptionService classDescriptionService, Auth0JwtService auth0JwtService) {
		this.classDescriptionService = classDescriptionService;
		this.auth0JwtService = auth0JwtService;
	}

	@QueryMapping
	public String getClassDescription() {
		return classDescriptionService.getValue();
	}

	@MutationMapping
	public String updateClassDescription(@AuthenticationPrincipal Jwt jwt, @Argument String value) {
		auth0JwtService.validateAdministrator(jwt);

		classDescriptionService.updateValue(value);

		return value;
	}
}
