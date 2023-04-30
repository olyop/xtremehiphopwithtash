package com.xtremehiphopwithtash.book.model;

import java.time.Instant;
import java.util.UUID;

public class ReferralCode extends Base {

	private UUID referralCodeID;
	private String code;
	private Instant usedAt;

	public ReferralCode() {}

	public UUID getReferralCodeID() {
		return referralCodeID;
	}

	public void setReferralCodeID(UUID referralCodeID) {
		this.referralCodeID = referralCodeID;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Instant getUsedAt() {
		return usedAt;
	}

	public void setUsedAt(Instant usedAt) {
		this.usedAt = usedAt;
	}
}
