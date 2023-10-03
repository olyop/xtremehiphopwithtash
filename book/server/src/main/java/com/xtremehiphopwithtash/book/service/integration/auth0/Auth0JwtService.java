package com.xtremehiphopwithtash.book.service.integration.auth0;

import java.security.Principal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class Auth0JwtService {

	private final String claimKey = "permissions";
	private final String claimValue = "administrator";

	public String extractStudentID(Principal principal) {
		return principal.getName();
	}

	public boolean isAdministrator(Jwt jwt) {
		return jwt.getClaimAsStringList(claimKey).contains(claimValue);
	}

	public void validateAdministrator(Jwt jwt) {
		if (!isAdministrator(jwt)) {
			throw new RuntimeException("Unauthorized");
		}
	}
}
