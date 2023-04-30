import { Session } from "../../generated-types";

export const isSessionInPast = ({ startTime }: Pick<Session, "startTime">) =>
	Date.now() > startTime;
