package com.xtremehiphopwithtash.book.service;

import com.auth0.client.auth.AuthAPI;
import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.auth.TokenHolder;
import com.auth0.json.mgmt.roles.RolesPage;
import com.auth0.net.TokenRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Auth0Management {

	private final ManagementAPI managementAPI;

	public Auth0Management(
		@Value("${auth0.api.domain}") String domain,
		@Value("${auth0.api.client.id}") String clientId,
		@Value("${auth0.api.client.secret}") String clientSecret
	) throws Auth0Exception {
		AuthAPI authAPI = AuthAPI.newBuilder(domain, clientId, clientSecret).build();
		TokenRequest tokenRequest = authAPI.requestToken(String.format("https://%s/api/v2/", domain));
		TokenHolder holder = tokenRequest.execute().getBody();
		String accessToken = holder.getAccessToken();
		this.managementAPI = ManagementAPI.newBuilder(domain, accessToken).build();
	}

	public boolean isUserAdministrator(String userId) throws Auth0Exception {
		RolesPage body = managementAPI.users().listRoles(userId, null).execute().getBody();
		return body.getItems().stream().anyMatch(role -> role.getName().equals("admin"));
	}
}
