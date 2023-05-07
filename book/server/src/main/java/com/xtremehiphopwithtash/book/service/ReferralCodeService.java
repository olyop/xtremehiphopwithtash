package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.dao.ReferralCodeDAO;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class ReferralCodeService {

	private final ReferralCodeDAO referralCodeDAO;
	private final SecureRandom secureRandom;

	public ReferralCodeService(ReferralCodeDAO referralCodeDAO) {
		this.referralCodeDAO = referralCodeDAO;
		this.secureRandom = new SecureRandom();
	}

	public String generate() {
		UUID uuid = UUID.randomUUID();
		String uuidNoDashes = uuid.toString().replace("-", "");
		List<String> characters = Arrays.asList(uuidNoDashes.split(""));
		int secureRandomUpperbound = (int) Math.floor(Math.random() * (20 - 10 + 1) + 10);

		for (int i = 0; i < secureRandom.nextInt(secureRandomUpperbound); i++) {
			Collections.shuffle(characters);
		}

		return String.join("", characters).substring(0, 9).toUpperCase();
	}

	public boolean canInsert(String code) {
		return !doesReferralCodeExist(code);
	}

	public boolean canUse(String code) {
		return canUseErrorMessage(code) == null;
	}

	public String canUseErrorMessage(String code) {
		if (code == null || code.isEmpty() || code.isBlank()) {
			return "Referral code cannot be empty";
		}

		if (code.length() != 9) {
			return "Referral code must be 9 characters long";
		}

		if (!code.matches("^[A-Z0-9]*$")) {
			return "Referral code must only contain uppercase letters and numbers";
		}

		if (!doesReferralCodeExist(code)) {
			return "Referral code does not exist";
		}

		if (hasReferralCodeBeenUsed(code)) {
			return "Referral code has already been used";
		}

		return null;
	}

	private boolean doesReferralCodeExist(String code) {
		return referralCodeDAO.existsByID(code);
	}

	private boolean hasReferralCodeBeenUsed(String code) {
		return referralCodeDAO.selectByID(code).get().getUsedAt() != null;
	}
}
