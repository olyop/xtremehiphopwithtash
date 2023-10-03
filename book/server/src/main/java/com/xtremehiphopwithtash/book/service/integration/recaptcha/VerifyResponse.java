package com.xtremehiphopwithtash.book.service.integration.recaptcha;

class VerifyResponse {

	private boolean success;
	private String hostname;
	private float score;
	private String action;

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
}
