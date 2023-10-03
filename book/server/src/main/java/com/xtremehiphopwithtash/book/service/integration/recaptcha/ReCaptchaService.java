package com.xtremehiphopwithtash.book.service.integration.recaptcha;

import com.xtremehiphopwithtash.book.other.ObjectMapperCustom;
import java.io.DataOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ReCaptchaService {

	private final URL verifyUrl;
	private final String secretKey;
	private final String hostname;
	private final String action;
	private final double scoreMinimum;

	private final ObjectMapperCustom objectMapper;

	public ReCaptchaService(
		@Value("${google.recaptcha.verify.url}") URL verifyUrl,
		@Value("${google.recaptcha.secret}") String secretKey,
		@Value("${google.recaptcha.hostname}") String hostname,
		@Value("${google.recaptcha.action}") String action,
		@Value("${google.recaptcha.score.minimum}") double scoreMinimum,
		ObjectMapperCustom objectMapper
	) {
		this.verifyUrl = verifyUrl;
		this.secretKey = secretKey;
		this.hostname = hostname;
		this.action = action;
		this.scoreMinimum = scoreMinimum;

		this.objectMapper = objectMapper;
	}

	public void validateResponse(String response, String remoteAddress) {
		if (response == null || response.isBlank()) {
			throw new ReCaptchaError("Response cannot be null or empty");
		}

		VerifyResponse verifyResponse;

		try {
			verifyResponse = retreiveResponse(response, remoteAddress);
		} catch (Exception e) {
			throw new ReCaptchaError("Error verify response");
		}

		validateResponse(verifyResponse);
	}

	private VerifyResponse retreiveResponse(String response, String remoteAddress) throws Exception {
		VerifyResponse verifyResponse;

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

		verifyResponse = objectMapper.instance().readValue(connection.getInputStream(), VerifyResponse.class);

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

	private void validateResponse(VerifyResponse verifyResponse) {
		if (!verifyResponse.getSuccess()) {
			throw new ReCaptchaError("Response is invalid");
		}

		if (!verifyResponse.getHostname().equals(hostname)) {
			throw new ReCaptchaError("Hostname is invalid");
		}

		if (!verifyResponse.getAction().equals(action)) {
			throw new ReCaptchaError("Action is invalid");
		}

		if (verifyResponse.getScore() < scoreMinimum) {
			throw new ReCaptchaError("Score too low");
		}
	}
}
