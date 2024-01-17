package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.graphql.input.GetBookingTrendsInput;
import com.xtremehiphopwithtash.book.service.database.trends.TrendsBooking;
import com.xtremehiphopwithtash.book.service.database.trends.TrendsService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import java.util.List;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class TrendsResolver {

	private final Auth0JwtService auth0JwtService;
	private final TrendsService trendsService;

	public TrendsResolver(Auth0JwtService auth0JwtService, TrendsService trendsService) {
		this.auth0JwtService = auth0JwtService;
		this.trendsService = trendsService;
	}

	@QueryMapping
	public List<TrendsBooking> getBookingTrends(@AuthenticationPrincipal Jwt jwt, @Argument GetBookingTrendsInput input) {
		auth0JwtService.validateAdministrator(jwt);

		return trendsService.retrieveBookingTrends(input.startTime(), input.endTime());
	}
}
