export const noop = () => {};

export const secondsToMilliseconds = (seconds: number): number => seconds * 1000;

export const millisecondsToSeconds = (milliseconds: number): number =>
	Math.floor(milliseconds / 1000);

export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export type ArrayElement<T> = T extends readonly (infer ElementType)[] ? ElementType : never;

export const determinePlural = (length: number) => (length === 1 ? "" : "s");
