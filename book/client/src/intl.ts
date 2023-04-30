export const currencyFormatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "AUD",
});

export const listFormatter = new Intl.ListFormat(undefined, {
	style: "narrow",
	type: "conjunction",
});

export const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
	timeStyle: "short",
});

export const thisYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "numeric",
	month: "long",
});

export const fullYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

export const timeFormatter = new Intl.DateTimeFormat(undefined, {
	hour: "numeric",
	minute: "numeric",
	hourCycle: "h12",
});

export const durationFormatter = new Intl.RelativeTimeFormat(undefined, {
	style: "long",
});
