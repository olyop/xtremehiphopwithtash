package com.xtremehiphopwithtash.book.controller;

import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.storage.ImageStorageService;
import java.io.IOException;
import java.net.URL;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/storage")
public class StorageController {

	private final ImageStorageService imageStorageService;
	private final Auth0JwtService auth0JwtService;

	public StorageController(ImageStorageService imageStorageService, Auth0JwtService auth0JwtService) {
		this.imageStorageService = imageStorageService;
		this.auth0JwtService = auth0JwtService;
	}

	@PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, produces = { MediaType.TEXT_PLAIN_VALUE })
	public String handleFileUpload(
		@RequestParam(value = "file", required = true) MultipartFile file,
		@RequestParam(value = "isLandscape", required = true) boolean isLandscape,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);

		URL url;

		try {
			url = imageStorageService.upload(file.getBytes(), isLandscape);
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Failed to upload file");
		}

		return url.toString();
	}
}
