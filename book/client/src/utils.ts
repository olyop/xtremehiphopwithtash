export const noop = () => {};

export const secondsToMilliseconds = (seconds: number): number => seconds * 1000;

export const millisecondsToSeconds = (milliseconds: number): number => Math.floor(milliseconds / 1000);

export const centsToDollars = (cents: number): number => Math.floor(cents / 100);
export const dollarsToCents = (dollars: number): number => dollars * 100;

export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export type ArrayElement<T> = T extends readonly (infer ElementType)[] ? ElementType : never;

export const determinePlural = (length: number) => (length === 1 ? "" : "s");
