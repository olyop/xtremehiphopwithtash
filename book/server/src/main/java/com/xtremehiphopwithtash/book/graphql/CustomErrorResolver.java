package com.xtremehiphopwithtash.book.graphql;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.stereotype.Component;

@Component
public class CustomErrorResolver extends DataFetcherExceptionResolverAdapter {

	@Override
	protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
		Throwable throwable = NestedExceptionUtils.getMostSpecificCause(ex);

		if (throwable instanceof Exception e) {
			return GraphqlErrorBuilder
				.newError(env)
				.errorType(ErrorTypes.BAD_REQUEST)
				.message(e.getMessage())
				.build();
		}

		// other exceptions not yet caught
		return GraphqlErrorBuilder
			.newError(env)
			.message("Error occurred: Ensure request is valid ")
			.errorType(ErrorTypes.BAD_REQUEST)
			.build();
	}
}
