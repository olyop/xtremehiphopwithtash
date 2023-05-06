package com.xtremehiphopwithtash.book.configuration;

import com.xtremehiphopwithtash.book.service.Auth0Management;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final Auth0Management managementAPI;

	public JwtAuthenticationFilter(JwtService jwtService, Auth0Management managementAPI) {
		this.jwtService = jwtService;
		this.managementAPI = managementAPI;
	}

	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain
	) throws ServletException, IOException {
		final String authorizationHeader = request.getHeader("Authorization");

		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		final String jwt = authorizationHeader.substring(7);

		final String studentID = "";
	}
}
