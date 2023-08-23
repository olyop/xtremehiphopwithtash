package com.xtremehiphopwithtash.book.graphql;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.stereotype.Component;

@Component
public class CustomErrorResolver extends DataFetcherExceptionResolverAdapter {

	private final String profile;

	public CustomErrorResolver(@Value("${spring.profiles.active}") String profile) {
		this.profile = profile;
	}

	@Override
	protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
		Throwable throwable = NestedExceptionUtils.getMostSpecificCause(ex);

		if (throwable instanceof Exception e) {
			if (profile.equals("development")) {
				e.printStackTrace();
			} else {
				SimpleDateFormat formatter = new SimpleDateFormat("EEE yyyy-MM-dd 'at' HH:mm:ss");

				String now = formatter.format(new Date());

				System.out.println();
				System.out.println("Exception thrown: " + e.getMessage());
				System.out.println("                  " + e.getClass().getName());
				System.out.println("                  " + now);
			}

			return GraphqlErrorBuilder.newError(env).errorType(ErrorTypes.BAD_REQUEST).message(e.getMessage()).build();
		}

		// other exceptions not yet caught
		return GraphqlErrorBuilder
			.newError(env)
			.message("Error occurred: Ensure request is valid ")
			.errorType(ErrorTypes.BAD_REQUEST)
			.build();
	}
}
