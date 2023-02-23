package com.xtremehiphopwithtash.book.graphql;

import graphql.ErrorClassification;

public enum ErrorTypes implements ErrorClassification {
	BAD_REQUEST,
	UNAUTHORIZED,
	FORBIDDEN,
	NOT_FOUND,
	INTERNAL_ERROR,
}
