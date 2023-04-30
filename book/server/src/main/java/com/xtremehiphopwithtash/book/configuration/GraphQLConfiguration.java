package com.xtremehiphopwithtash.book.configuration;

import com.xtremehiphopwithtash.book.graphql.InstantCoerce;
import graphql.scalars.ExtendedScalars;
import graphql.schema.GraphQLScalarType;
import java.util.regex.Pattern;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration
public class GraphQLConfiguration {

	private final GraphQLScalarType URLScalar = ExtendedScalars
		.newAliasedScalar("URL")
		.aliasedScalar(ExtendedScalars.Url)
		.build();

	private final GraphQLScalarType UUIDScalar = ExtendedScalars
		.newAliasedScalar("UUID")
		.aliasedScalar(ExtendedScalars.UUID)
		.build();

	private final GraphQLScalarType LikertScale = ExtendedScalars
		.newRegexScalar("LikertScale")
		.addPattern(Pattern.compile("^[1-5]$"))
		.build();

	private final GraphQLScalarType UnixTimeScalar = GraphQLScalarType
		.newScalar()
		.name("UnixTime")
		.coercing(new InstantCoerce())
		.build();

	@Bean
	public RuntimeWiringConfigurer runtimeWiringConfigurerGraphQL() {
		return wiringBuilder ->
			wiringBuilder
				.scalar(URLScalar)
				.scalar(UUIDScalar)
				.scalar(LikertScale)
				.scalar(UnixTimeScalar)
				.scalar(ExtendedScalars.PositiveInt)
				.scalar(ExtendedScalars.NonNegativeInt);
	}
}
