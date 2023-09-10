package com.xtremehiphopwithtash.book.graphql;

import graphql.GraphQLContext;
import graphql.Internal;
import graphql.execution.CoercedVariables;
import graphql.language.IntValue;
import graphql.language.Value;
import graphql.scalars.util.Kit;
import graphql.schema.Coercing;
import graphql.schema.CoercingParseLiteralException;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;
import java.time.DateTimeException;
import java.time.Instant;
import java.util.Locale;

@Internal
public class InstantCoerce implements Coercing<Instant, Integer> {

	@Override
	public Integer serialize(Object dataFetcherResult, GraphQLContext graphQLContext, Locale locale)
		throws CoercingSerializeException {
		return serializeImpl(dataFetcherResult);
	}

	@Override
	public Instant parseValue(Object input, GraphQLContext graphQLContext, Locale locale)
		throws CoercingParseValueException {
		return parseImpl(input);
	}

	@Override
	public Instant parseLiteral(Value<?> input, CoercedVariables variables, GraphQLContext graphQLContext, Locale locale)
		throws CoercingParseLiteralException {
		return parseImpl(input);
	}

	private Integer serializeImpl(Object dataFetcherResult) {
		if (dataFetcherResult instanceof Instant instant) {
			Long epoch = instant.getEpochSecond();
			return epoch.intValue();
		}

		throw new CoercingSerializeException(
			"Expected an object of type 'Instant' but got '" + Kit.typeName(dataFetcherResult) + "'."
		);
	}

	private Instant parseImpl(Object input) {
		try {
			if (input instanceof Integer intValue) {
				return Instant.ofEpochSecond(intValue);
			} else if (input instanceof IntValue intValue) {
				return Instant.ofEpochSecond(intValue.getValue().intValue());
			}
		} catch (DateTimeException dte) {
			throw new CoercingParseLiteralException("Expected a valid epoch second value but was '" + input + "'.");
		}

		throw new CoercingParseLiteralException("Expected a 'Integer' but was '" + Kit.typeName(input) + "'.");
	}
}
