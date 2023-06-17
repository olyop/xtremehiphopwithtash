package com.xtremehiphopwithtash.book.graphql;

import graphql.Internal;
import graphql.language.IntValue;
import graphql.scalars.util.Kit;
import graphql.schema.Coercing;
import graphql.schema.CoercingParseLiteralException;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;
import java.time.DateTimeException;
import java.time.Instant;

@Internal
public class InstantCoerce implements Coercing<Instant, Integer> {

	@Override
	public Integer serialize(Object dataFetcherResult) throws CoercingSerializeException {
		if (dataFetcherResult == null) {
			return null;
		}

		if (dataFetcherResult instanceof Instant instant) {
			Long epoch = instant.getEpochSecond();
			return epoch.intValue();
		}

		throw new CoercingSerializeException(
			"Expected an object of type 'Instant' but got '" + Kit.typeName(dataFetcherResult) + "'."
		);
	}

	@Override
	public Instant parseValue(Object input) throws CoercingParseValueException {
		if (input == null) {
			return null;
		}

		if (input instanceof Integer intValue) {
			try {
				return Instant.ofEpochSecond(intValue);
			} catch (DateTimeException dte) {
				throw new CoercingParseValueException("Expected a valid epoch second value but was '" + intValue + "'.");
			}
		}

		if (input instanceof IntValue intValue) {
			try {
				return Instant.ofEpochSecond(intValue.getValue().intValue());
			} catch (DateTimeException dte) {
				throw new CoercingParseValueException("Expected a valid epoch second value but was '" + intValue + "'.");
			}
		}

		throw new CoercingParseValueException("Expected a 'Integer' but was '" + Kit.typeName(input) + "'.");
	}

	@Override
	public Instant parseLiteral(Object input) throws CoercingParseLiteralException {
		if (input == null) {
			return null;
		}

		if (input instanceof Integer intValue) {
			try {
				return Instant.ofEpochSecond(intValue);
			} catch (DateTimeException dte) {
				throw new CoercingParseValueException("Expected a valid epoch second value but was '" + intValue + "'.");
			}
		}

		if (input instanceof IntValue intValue) {
			try {
				return Instant.ofEpochSecond(intValue.getValue().intValue());
			} catch (DateTimeException dte) {
				throw new CoercingParseLiteralException("Expected a valid epoch second value but was '" + intValue + "'.");
			}
		}

		throw new CoercingParseLiteralException("Expected a 'Integer' but was '" + Kit.typeName(input) + "'.");
	}
}
