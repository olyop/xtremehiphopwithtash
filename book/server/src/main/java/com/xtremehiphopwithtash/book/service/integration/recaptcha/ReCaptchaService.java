package com.xtremehiphopwithtash.book.service.integration.recaptcha;

import com.xtremehiphopwithtash.book.other.ObjectMapperCustom;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.io.DataOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ReCaptchaService {

	private final URL verifyUrl;
	private final String secretKey;
	private final String action;
	private final double scoreMinimum;
	private final List<String> allowedHostnames;

	private final ObjectMapperCustom objectMapper;

	public ReCaptchaService(
		@Value("${google.recaptcha.verify.url}") URL verifyUrl,
		@Value("${google.recaptcha.secret}") String secretKey,
		@Value("${google.recaptcha.action}") String action,
		@Value("${google.recaptcha.score.minimum}") double scoreMinimum,
		@Value("#{'${google.recaptcha.allowed.hostnames}'.split(',')}") List<String> allowedHostnames,
		ObjectMapperCustom objectMapper
	) {
		this.verifyUrl = verifyUrl;
		this.secretKey = secretKey;
		this.action = action;
		this.scoreMinimum = scoreMinimum;
		this.allowedHostnames = allowedHostnames;

		this.objectMapper = objectMapper;
	}

	public void validate(String token, String remoteAddress) {
		validateToken(token);

		ReCaptchaVerifyResponse verifyResponse;

		try {
			verifyResponse = retreiveResponse(token, remoteAddress);
		} catch (Exception e) {
			throw new ResolverException("Error verify response", e);
		}

		validateVerifyResponse(verifyResponse);
	}

	private void validateToken(String token) {
		if (token == null || token.isBlank()) {
			throw new ReCaptchaError("Response cannot be null or empty");
		}
	}

	private ReCaptchaVerifyResponse retreiveResponse(String response, String remoteAddress) throws Exception {
		ReCaptchaVerifyResponse verifyResponse;

		HttpURLConnection connection = (HttpURLConnection) verifyUrl.openConnection();

		connection.setRequestMethod("POST");
		connection.setDoInput(true);
		connection.setDoOutput(true);
		connection.setUseCaches(false);
		connection.setInstanceFollowRedirects(false);
		connection.setRequestProperty("Content-Length", "0");
		connection.setRequestProperty("Charset", StandardCharsets.UTF_8.displayName());
		connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

		DataOutputStream out = new DataOutputStream(connection.getOutputStream());
		out.writeBytes(constructParamaters(response, remoteAddress));
		out.flush();
		out.close();

		verifyResponse = objectMapper.instance().readValue(connection.getInputStream(), ReCaptchaVerifyResponse.class);

		return verifyResponse;
	}

	private String constructParamaters(String response, String remoteAddress) throws UnsupportedEncodingException {
		StringBuilder result = new StringBuilder();

		Map<String, String> paramaters = new HashMap<>();
		paramaters.put("secret", secretKey);
		paramaters.put("response", response);
		paramaters.put("remoteip", remoteAddress);

		for (Map.Entry<String, String> entry : paramaters.entrySet()) {
			result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
			result.append("=");
			result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
			result.append("&");
		}

		String resultString = result.toString();

		return resultString.length() > 0 ? resultString.substring(0, resultString.length() - 1) : resultString;
	}

	private void validateVerifyResponse(ReCaptchaVerifyResponse verifyResponse) {
		if (!verifyResponse.getAction().equals(action)) {
			throw new ReCaptchaError("Action is invalid");
		}

		if (verifyResponse.getHostname() == null || !allowedHostnames.contains(verifyResponse.getHostname())) {
			throw new ReCaptchaError("Hostname is invalid");
		}

		if (verifyResponse.getScore() < scoreMinimum) {
			throw new ReCaptchaError("Score too low");
		}

		if (!verifyResponse.getSuccess()) {
			throw new ReCaptchaError("Response is invalid");
		}
	}
}
