package com.xtremehiphopwithtash.book.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {

	private final String[] allowedOrigins;
	private final String[] allowedMethods;

	public WebConfiguration(
		@Value("${cors.allowed.origins}") String[] allowedOrigins,
		@Value("${cors.allowed.methods}") String[] allowedMethods
	) {
		this.allowedOrigins = allowedOrigins;
		this.allowedMethods = allowedMethods;
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
			.addMapping("/**")
			.allowedOrigins(allowedOrigins)
			.allowedMethods(allowedMethods)
			.allowCredentials(true);
	}
}
