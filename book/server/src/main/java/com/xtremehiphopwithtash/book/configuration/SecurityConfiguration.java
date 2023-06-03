package com.xtremehiphopwithtash.book.configuration;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

	private final CorsConfiguration corsConfiguration;

	public SecurityConfiguration(
		@Value("${cors.allowed.origins}") String[] allowedOrigins,
		@Value("${cors.allowed.methods}") String[] allowedMethods
	) {
		this.corsConfiguration = buildCorsConfiguration(allowedOrigins, allowedMethods);
	}

	private CorsConfiguration buildCorsConfiguration(
		String[] allowedOrigins,
		String[] allowedMethods
	) {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedOrigins(List.of(allowedOrigins));
		corsConfiguration.setAllowedMethods(List.of(allowedMethods));
		corsConfiguration.setAllowCredentials(true);
		return corsConfiguration;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
			.cors(cors -> cors.configurationSource(request -> corsConfiguration))
			.authorizeHttpRequests(authorize -> {
				authorize.requestMatchers("/stripe").permitAll();
				authorize.requestMatchers("/graphiql").permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/api/**").authenticated();
				authorize.requestMatchers(HttpMethod.POST, "/graphql").authenticated();
			})
			.oauth2ResourceServer()
			.jwt()
			.and()
			.and()
			.build();
	}
}
