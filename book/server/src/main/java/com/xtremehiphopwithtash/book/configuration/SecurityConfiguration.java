package com.xtremehiphopwithtash.book.configuration;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfiguration {

	private final CorsConfiguration corsConfiguration;

	private final String[] resources = new String[] {
		"/",
		"/index.html",
		"/health",
		"/notFound",
		"/favicon.png",
		"/robots.txt",
		"/assets/**",
		"/fonts/**",
		"/images/**",
		"/admin",
		"/session/**",
		"/account",
		"/payment",
		"/payment-success",
	};

	public SecurityConfiguration(@Value("${cors.allowed.origins}") List<String> allowedOrigins) {
		this.corsConfiguration = buildCorsConfiguration(allowedOrigins);
	}

	private CorsConfiguration buildCorsConfiguration(List<String> allowedOrigins) {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(allowedOrigins);
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowCredentials(true);
		return configuration;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.configurationSource(request -> corsConfiguration))
			.authorizeHttpRequests(authorize -> {
				authorize.requestMatchers(HttpMethod.GET, resources).permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/stripe/webhook").permitAll();
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
