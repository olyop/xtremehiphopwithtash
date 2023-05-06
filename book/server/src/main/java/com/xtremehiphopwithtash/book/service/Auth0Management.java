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
		this.managementAPI = build(domain, clientId, clientSecret);
	}

	private ManagementAPI build(String domain, String clientId, String clientSecret)
		throws Auth0Exception {
		AuthAPI authAPI = AuthAPI.newBuilder(domain, clientId, clientSecret).build();
		TokenRequest tokenRequest = authAPI.requestToken(String.format("https://%s/api/v2/", domain));
		TokenHolder holder = tokenRequest.execute().getBody();
		String accessToken = holder.getAccessToken();
		return ManagementAPI.newBuilder(domain, accessToken).build();
	}

	public boolean doesUserExist(String userId) {
		try {
			return managementAPI.users().get(userId, null).execute().getStatusCode() == 200;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean isUserAdministrator(String userId) {
		try {
			RolesPage body = managementAPI.users().listRoles(userId, null).execute().getBody();
			return body.getItems().stream().anyMatch(role -> role.getName().equals("admin"));
		} catch (Exception e) {
			return false;
		}
	}
}
