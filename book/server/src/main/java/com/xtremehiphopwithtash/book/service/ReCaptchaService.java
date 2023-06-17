package com.xtremehiphopwithtash.book.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
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

	private final String verifyUrl;
	private final String secretKey;
	private final String hostname;
	private final String action;

	private final ObjectMapper objectMapper;

	public ReCaptchaService(
		@Value("${google.recaptcha.verify.url}") String verifyUrl,
		@Value("${google.recaptcha.secret}") String secretKey,
		@Value("${google.recaptcha.hostname}") String hostname,
		@Value("${google.recaptcha.action}") String action
	) {
		this.verifyUrl = verifyUrl;
		this.secretKey = secretKey;
		this.hostname = hostname;
		this.action = action;

		this.objectMapper = new ObjectMapper();
		this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}

	public boolean verifyResponse(String response) {
		if (response == null || "".equals(response)) {
			return false;
		}

		try {
			URL url = new URL(verifyUrl);

			HttpURLConnection connection = (HttpURLConnection) url.openConnection();

			Map<String, String> paramaters = new HashMap<>();
			paramaters.put("secret", secretKey);
			paramaters.put("response", response);

			connection.setRequestMethod("POST");
			connection.setDoInput(true);
			connection.setDoOutput(true);
			connection.setUseCaches(false);
			connection.setInstanceFollowRedirects(false);
			connection.setRequestProperty("Content-Length", "0");
			connection.setRequestProperty("Charset", StandardCharsets.UTF_8.displayName());
			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

			DataOutputStream out = new DataOutputStream(connection.getOutputStream());
			out.writeBytes(getParamsString(paramaters));
			out.flush();
			out.close();

			VerifyResponse verifyResponse = objectMapper.readValue(connection.getInputStream(), VerifyResponse.class);

			System.out.println(verifyResponse);

			return (
				verifyResponse.success() &&
				verifyResponse.hostname().equals(hostname) &&
				verifyResponse.action().equals(action) &&
				verifyResponse.score() >= 0.5
			);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	private String getParamsString(Map<String, String> params) throws UnsupportedEncodingException {
		StringBuilder result = new StringBuilder();

		for (Map.Entry<String, String> entry : params.entrySet()) {
			result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
			result.append("=");
			result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
			result.append("&");
		}

		String resultString = result.toString();
		return resultString.length() > 0 ? resultString.substring(0, resultString.length() - 1) : resultString;
	}

	private record VerifyResponse(boolean success, String hostname, float score, String action) {}
}
