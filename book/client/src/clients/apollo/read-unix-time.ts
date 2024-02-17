import { FieldReadFunction } from "@apollo/client/cache/inmemory/policies";

import { secondsToMilliseconds } from "../../utils";

export const readUnixTime: FieldReadFunction<number, number> = value => {
	if (value === undefined) {
		return value;
	}

	return secondsToMilliseconds(value);
};
