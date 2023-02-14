// package com.xtremehiphopwithtash.book.graphql;

// import graphql.GraphQLError;
// import graphql.GraphqlErrorBuilder;
// import graphql.schema.DataFetchingEnvironment;
// import org.springframework.core.NestedExceptionUtils;
// import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
// import org.springframework.stereotype.Component;

// @Component
// public class CustomErrorResolver extends DataFetcherExceptionResolverAdapter {

// 	@Override
// 	protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
// 		Throwable t = NestedExceptionUtils.getMostSpecificCause(ex);

// 		if (t instanceof IllegalArgumentException customException) {
// 			return GraphqlErrorBuilder
// 				.newError(env)
// 				.errorType(ErrorTypes.BAD_REQUEST)
// 				.message(customException.getMessage())
// 				.build();
// 		}

// 		// other exceptions not yet caught
// 		return GraphqlErrorBuilder
// 			.newError(env)
// 			.message("Error occurred: Ensure request is valid ")
// 			.errorType(ErrorTypes.BAD_REQUEST)
// 			.build();
// 	}
// }
