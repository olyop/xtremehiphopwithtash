export const isToday = (date: Date): boolean => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export const getStartOfDay = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);
	return newDate;
};

export const getEndOfDay = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setHours(23, 59, 59, 999);
	return newDate;
};

export const getMonday = (date: Date): Date => {
	const newDate = new Date(date);
	const day = newDate.getDay();
	const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(newDate.setDate(diff));
};

export const addOneWeek = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 7);
	return newDate;
};

export const minusOneWeek = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - 7);
	return newDate;
};

export const addOneMonth = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setMonth(newDate.getMonth() + 1);
	return newDate;
};

export const addThreeDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 3);
	return newDate;
};

export const minusThreeDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - 3);
	return newDate;
};

export const addNineDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 9);
	return newDate;
};

export const addTwoDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 2);
	return newDate;
};

export const minusTwoDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - 2);
	return newDate;
};

export const addSixDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 6);
	return newDate;
};

export const isInPast = (date: Date): boolean => {
	const now = new Date();
	return date.getTime() < now.getTime();
};

export const isDateInBetweenRange = (date: number, range: readonly [startDate: Date, endDate: Date]) =>
	date >= range[0].getTime() && date <= range[1].getTime();

export const calculateNumberOfDaysBetweenRange = (startTime: Date, endTime: Date): number => {
	const start = getStartOfDay(startTime);
	const end = getStartOfDay(endTime);
	const diff = end.getTime() - start.getTime();
	return diff / (1000 * 60 * 60 * 24);
};
