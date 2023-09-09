package com.xtremehiphopwithtash.book.configuration;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.Header;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {

	private final HeaderWriter headerWriter;
	private final CorsConfigurationSource corsConfigurationSource;

	private final String[] resources = new String[] {
		"/",
		"/index.html",
		"/health",
		"/notFound",
		"/favicon.ico",
		"/favicon.png",
		"/robots.txt",
		"/assets/**",
		"/fonts/**",
		"/images/**",
		"/.well-known/**",
		"/admin",
		"/session/**",
		"/account",
		"/payment",
		"/payment-success",
		"/merch",
	};

	public SecurityConfiguration(@Value("${cors.allowed.origins}") List<String> allowedOrigins) {
		this.corsConfigurationSource = buildCorsConfigurationSource(allowedOrigins);
		this.headerWriter = buildHeaderWriter();
	}

	private CorsConfigurationSource buildCorsConfigurationSource(List<String> allowedOrigins) {
		CorsConfiguration allDomainsConfiguration = new CorsConfiguration();
		// allDomainsConfiguration.setAllowedOrigins(List.of("*"));
		// allDomainsConfiguration.setAllowedMethods(List.of("GET", "POST", "OPTIONS"));
		// allDomainsConfiguration.setAllowCredentials(true);
		allDomainsConfiguration.applyPermitDefaultValues();

		// CorsConfiguration currentDomainConfiguration = new CorsConfiguration();
		// currentDomainConfiguration.setAllowedOrigins(allowedOrigins);
		// currentDomainConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "OPTIONS"));
		// currentDomainConfiguration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", allDomainsConfiguration);

		return source;
	}

	public HeaderWriter buildHeaderWriter() {
		List<Header> headers = new ArrayList<>();
		headers.add(new Header("Cache-Control", "max-age=2678400"));
		HeaderWriter headerWriter = new StaticHeadersWriter(headers);
		return headerWriter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.configurationSource(corsConfigurationSource))
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(authorize -> {
				authorize.requestMatchers(HttpMethod.GET, resources).permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/stripe/webhook").permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/api/**").authenticated();
				authorize.requestMatchers(HttpMethod.POST, "/graphql").authenticated();
			})
			.oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
			.headers(headers -> headers.cacheControl(Customizer.withDefaults()).addHeaderWriter(headerWriter))
			.build();
	}
}
