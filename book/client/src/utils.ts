export const secondsToMilliseconds = (seconds: number): number => seconds * 1000;
export const millisecondsToSeconds = (milliseconds: number): number =>
	Math.floor(milliseconds / 1000);
