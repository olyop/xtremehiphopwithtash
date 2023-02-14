package com.xtremehiphopwithtash.book;

import com.xtremehiphopwithtash.book.graphql.InstantCoerce;
import graphql.scalars.ExtendedScalars;
import graphql.schema.GraphQLScalarType;
import java.util.regex.Pattern;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

@Configuration
public class ApplicationConfiguration {

	private final GraphQLScalarType URLScalar = ExtendedScalars
		.newAliasedScalar("URL")
		.aliasedScalar(ExtendedScalars.Url)
		.build();

	private final GraphQLScalarType UUIDScalar = ExtendedScalars
		.newAliasedScalar("UUID")
		.aliasedScalar(ExtendedScalars.UUID)
		.build();

	private final GraphQLScalarType PriceScalar = ExtendedScalars
		.newAliasedScalar("Price")
		.aliasedScalar(ExtendedScalars.PositiveFloat)
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

	private final GraphQLScalarType MobilePhoneNumberScalar = ExtendedScalars
		.newRegexScalar("MobilePhoneNumber")
		.addPattern(Pattern.compile("^\\d{10}$"))
		.build();

	@Bean
	public RuntimeWiringConfigurer runtimeWiringConfigurerGraphQL() {
		return wiringBuilder ->
			wiringBuilder
				.scalar(URLScalar)
				.scalar(UUIDScalar)
				.scalar(PriceScalar)
				.scalar(LikertScale)
				.scalar(UnixTimeScalar)
				.scalar(MobilePhoneNumberScalar)
				.scalar(ExtendedScalars.PositiveInt);
	}

	@Bean
	public NamedParameterJdbcTemplate namedParameterJdbcTemplate(DataSource dataSource) {
		return new NamedParameterJdbcTemplate(dataSource);
	}
}
