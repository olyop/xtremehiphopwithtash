package com.xtremehiphopwithtash.book.other;

public class LikertScale {

	private byte value;

	public LikertScale(int value) {
		setInternalValue(value);
	}

	public int getValue() {
		return (int) value;
	}

	public void setValue(int value) {
		setInternalValue(value);
	}

	private void setInternalValue(int value) {
		if (value < 1 || value > 5) {
			throw new IllegalArgumentException("Value must be between 1 and 5");
		}

		this.value = (byte) value;
	}
}
