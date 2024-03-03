package com.xtremehiphopwithtash.book.service.validator;

public class ResolverException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ResolverException(Throwable cause) {
		super(cause);
	}

	public ResolverException(String message) {
		super(message);
	}

	public ResolverException(String message, Throwable cause) {
		super(message, cause);
	}
}
