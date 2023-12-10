package com.xtremehiphopwithtash.book.configuration;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {

	private final List<String> allowedOrigins;
	private final List<String> allowedMethods;

	public SecurityConfiguration(
		@Value("#{'${cors.allowed.origins}'.split(',')}") List<String> allowedOrigins,
		@Value("#{'${cors.allowed.methods}'.split(',')}") List<String> allowedMethods
	) {
		this.allowedOrigins = allowedOrigins;
		this.allowedMethods = allowedMethods;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
			.csrf(csrf -> {
				csrf.disable();
			})
			.httpBasic(httpBasic -> {
				httpBasic.disable();
			})
			.formLogin(formLogin -> {
				formLogin.disable();
			})
			.sessionManagement(session -> {
				session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			})
			.oauth2ResourceServer(oauth2 -> {
				oauth2.jwt(Customizer.withDefaults());
			})
			.cors(cors -> {
				CorsConfiguration configuration = new CorsConfiguration();

				configuration.setAllowedOrigins(allowedOrigins);
				configuration.setAllowedMethods(allowedMethods);
				configuration.setAllowCredentials(true);
				configuration.applyPermitDefaultValues();

				UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
				source.registerCorsConfiguration("/**", configuration);

				cors.configurationSource(source);
			})
			.headers(headers -> {
				headers.xssProtection(Customizer.withDefaults());
				headers.contentSecurityPolicy(Customizer.withDefaults());
			})
			.authorizeHttpRequests(authorize -> {
				authorize.requestMatchers(HttpMethod.GET, "/health").permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/stripe/webhook").permitAll();
				authorize.requestMatchers(HttpMethod.POST, "/graphql").authenticated();
				authorize.requestMatchers(HttpMethod.POST, "/storage").authenticated();
				authorize.requestMatchers(HttpMethod.OPTIONS, "/graphql").authenticated();
				authorize.requestMatchers(HttpMethod.OPTIONS, "/storage").authenticated();
			})
			.build();
	}
}
