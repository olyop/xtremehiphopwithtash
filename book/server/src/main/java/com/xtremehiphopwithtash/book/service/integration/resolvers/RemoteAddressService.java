package com.xtremehiphopwithtash.book.service.integration.resolvers;

import graphql.GraphQLContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

@Service
public class RemoteAddressService {

	public String getRemoteAddress(GraphQLContext context) {
		SecurityContext securityContext = (SecurityContext) context.get(SecurityContext.class.getName());
		Authentication authentication = securityContext.getAuthentication();
		WebAuthenticationDetails details = (WebAuthenticationDetails) authentication.getDetails();
		return details.getRemoteAddress();
	}
}
