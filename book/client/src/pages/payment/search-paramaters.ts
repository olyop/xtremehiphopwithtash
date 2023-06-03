export const verifyIntegerParamater = (value: string) => {
	try {
		const parsed = Number.parseInt(value, 10);
		if (Number.isNaN(parsed)) {
			return false;
		} else if (parsed < 0) {
			return false;
		} else if (parsed > 5) {
			return false;
		} else {
			return true;
		}
	} catch {
		return false;
	}
};
