package com.xtremehiphopwithtash.book.service;

import java.security.Principal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class Auth0JwtService {

	public String extractStudentID(Principal principal) {
		return principal.getName();
	}

	public boolean isAdministrator(Jwt jwt) {
		return jwt.getClaimAsStringList("permissions").contains("administrator");
	}

	public void validateAdministrator(Jwt jwt) {
		if (!isAdministrator(jwt)) {
			throw new RuntimeException("Unauthorized");
		}
	}
}
