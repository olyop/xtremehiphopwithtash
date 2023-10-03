package com.xtremehiphopwithtash.book.service.integration.auth0;

import com.auth0.client.auth.AuthAPI;
import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.client.mgmt.filter.ClientFilter;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.auth.TokenHolder;
import com.auth0.json.mgmt.client.ClientsPage;
import com.auth0.json.mgmt.users.User;
import com.auth0.net.Response;
import java.time.Instant;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class Auth0ManagementService {

	private final String domain;
	private final String audience;

	private final AuthAPI authApi;
	private final ManagementAPI managementApi;

	private TokenHolder tokenHolder;

	public Auth0ManagementService(
		@Value("${auth0.application.domain}") String domain,
		@Value("${auth0.application.client.id}") String clientId,
		@Value("${auth0.application.client.secret}") String clientSecret
	) {
		this.domain = domain;
		this.audience = String.format("https://%s/api/v2/", domain);
		this.authApi = AuthAPI.newBuilder(domain, clientId, clientSecret).build();
		this.managementApi = getManagementApi();
	}

	private ManagementAPI getManagementApi() {
		if (tokenHolder == null || tokenHolder.getExpiresAt().after(Date.from(Instant.now()))) {
			synchronized (this) {
				if (tokenHolder == null || tokenHolder.getExpiresAt().after(Date.from(Instant.now()))) {
					Response<TokenHolder> response;

					try {
						response = authApi.requestToken(audience).execute();
					} catch (Auth0Exception e) {
						throw new RuntimeException(e);
					}

					this.tokenHolder = response.getBody();

					if (managementApi == null) {
						return ManagementAPI.newBuilder(domain, tokenHolder.getAccessToken()).build();
					} else {
						managementApi.setApiToken(tokenHolder.getAccessToken());

						return managementApi;
					}
				} else {
					return managementApi;
				}
			}
		} else {
			return managementApi;
		}
	}

	public ClientsPage listApplications() {
		try {
			return getManagementApi().clients().list(new ClientFilter()).execute().getBody();
		} catch (Auth0Exception e) {
			throw new RuntimeException(e);
		}
	}

	public void updateUserEmailAddress(String userId, String newEmailAddress) {
		try {
			User user = new User();
			user.setEmail(newEmailAddress);

			getManagementApi().users().update(userId, user).execute();
		} catch (Auth0Exception e) {
			throw new RuntimeException(e);
		}
	}
}
