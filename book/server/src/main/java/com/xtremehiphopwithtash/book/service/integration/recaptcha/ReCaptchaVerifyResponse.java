package com.xtremehiphopwithtash.book.service.integration.recaptcha;

import java.util.List;

class ReCaptchaVerifyResponse {

	private boolean success;
	private String hostname;
	private float score;
	private String action;
	private List<String> errorCodes;

	boolean getSuccess() {
		return success;
	}

	void setSuccess(boolean success) {
		this.success = success;
	}

	String getHostname() {
		return hostname;
	}

	void setHostname(String hostname) {
		this.hostname = hostname;
	}

	float getScore() {
		return score;
	}

	void setScore(float score) {
		this.score = score;
	}

	String getAction() {
		return action;
	}

	void setAction(String action) {
		this.action = action;
	}

	List<String> getErrorCodes() {
		return errorCodes;
	}

	void setErrorCodes(List<String> errorCodes) {
		this.errorCodes = errorCodes;
	}
}
