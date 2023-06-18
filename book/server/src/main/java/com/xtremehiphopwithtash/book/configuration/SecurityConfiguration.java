package com.xtremehiphopwithtash.book.configuration;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.Header;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfiguration {

	private final HeaderWriter headerWriter;
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
		this.headerWriter = buildHeaderWriter();
	}

	private CorsConfiguration buildCorsConfiguration(List<String> allowedOrigins) {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(allowedOrigins);
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowCredentials(true);
		return configuration;
	}

	public HeaderWriter buildHeaderWriter() {
		List<Header> headers = new ArrayList<>();
		headers.add(new Header("Cache-Control", "max-age=86400"));
		HeaderWriter headerWriter = new StaticHeadersWriter(headers);
		return headerWriter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.configurationSource(request -> corsConfiguration))
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(authorize -> {
				authorize.requestMatchers(HttpMethod.GET, resources).permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/stripe/webhook").permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/api/**").authenticated();
				authorize.requestMatchers(HttpMethod.POST, "/graphql").authenticated();
			})
			.oauth2ResourceServer(oauth2 -> oauth2.jwt())
			.headers(headers -> headers.cacheControl().disable().addHeaderWriter(headerWriter))
			.build();
	}
}
