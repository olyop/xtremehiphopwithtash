package com.xtremehiphopwithtash.book.service.coupon;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class CouponService {

	private final CouponDAO couponDAO;

	private final String couponPrefix = "XHWT";
	private final SecureRandom secureRandom = new SecureRandom();

	public CouponService(CouponDAO couponDAO) {
		this.couponDAO = couponDAO;
	}

	public boolean canUse(String code) {
		return canUseErrorMessage(code) == null;
	}

	public String canUseErrorMessage(String code) {
		if (code == null || code.isEmpty() || code.isBlank()) {
			return "Coupon cannot be empty";
		}

		if (code.length() != 9) {
			return "Coupon must be 9 characters long";
		}

		if (!code.matches("^[A-Z0-9]*$")) {
			return "Coupon must only contain uppercase letters and numbers";
		}

		if (!doesCodeExist(code)) {
			return "Coupon does not exist";
		}

		if (hasCodeBeenUsed(code)) {
			return "Coupon has already been used";
		}

		return null;
	}

	public String create(int discount) {
		validateDiscount(discount);

		String code = generateCode();

		while (doesCodeExist(code)) {
			code = generateCode();
		}

		Coupon coupon = new Coupon();

		coupon.setCode(code);
		coupon.setDiscount(discount);

		couponDAO.insert(coupon);

		return code;
	}

	public int getDiscount(String code) {
		String errorMessage = canUseErrorMessage(code);

		if (errorMessage != null) {
			throw new IllegalArgumentException(errorMessage);
		}

		return couponDAO.selectByID(code).getDiscount();
	}

	public void use(String code, String studentID, UUID bookingID) {
		String errorMessage = canUseErrorMessage(code);

		if (errorMessage != null) {
			throw new IllegalArgumentException(errorMessage);
		}

		Coupon coupon = new Coupon();
		coupon.setUsedAt(Instant.now());
		coupon.setUsedByStudentID(studentID);
		coupon.setUsedOnBookingID(bookingID);

		couponDAO.updateByID(code, coupon);
	}

	public void delete(String studentID, UUID bookingID) {
		couponDAO.deleteByStudentAndBooking(studentID, bookingID);
	}

	private String generateCode() {
		UUID uuid = UUID.randomUUID();
		String uuidNoDashes = uuid.toString().replace("-", "");
		List<String> characters = Arrays.asList(uuidNoDashes.split(""));

		int secureRandomUpperbound = (int) Math.floor(Math.random() * (20 - 10 + 1) + 10);

		for (int i = 0; i < secureRandom.nextInt(secureRandomUpperbound); i++) {
			Collections.shuffle(characters);
		}

		return couponPrefix + String.join("", characters).substring(0, 5).toUpperCase();
	}

	private boolean doesCodeExist(String code) {
		return couponDAO.existsByID(code);
	}

	private boolean hasCodeBeenUsed(String code) {
		Coupon coupon = couponDAO.selectByID(code);

		if (coupon.getUsedAt() == null && coupon.getUsedByStudentID() == null && coupon.getUsedOnBookingID() == null) {
			return false;
		} else if (
			coupon.getUsedAt() != null && coupon.getUsedByStudentID() != null && coupon.getUsedOnBookingID() != null
		) {
			return true;
		} else {
			throw new IllegalStateException("ERROR: Coupon has been partially used");
		}
	}

	private void validateDiscount(int discount) {
		if (discount <= 0 || discount > 100) {
			throw new IllegalArgumentException("Discount must be between 0 and 100");
		}
	}
}
