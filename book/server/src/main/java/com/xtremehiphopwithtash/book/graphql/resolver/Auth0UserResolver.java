package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.other.Auth0User;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0ManagementService;
import java.util.List;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class Auth0UserResolver {

	private final Auth0ManagementService auth0ManagementService;
	private final Auth0JwtService auth0JwtService;

	public Auth0UserResolver(Auth0ManagementService auth0ManagementService, Auth0JwtService auth0JwtService) {
		this.auth0ManagementService = auth0ManagementService;
		this.auth0JwtService = auth0JwtService;
	}

	@QueryMapping
	public List<Auth0User> getAuth0Users(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return auth0ManagementService.getUsers();
	}
}
