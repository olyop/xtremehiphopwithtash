export const verifyBooleanParamater = (value: string) => {
	try {
		JSON.parse(value);
		return true;
	} catch {
		return false;
	}
};
