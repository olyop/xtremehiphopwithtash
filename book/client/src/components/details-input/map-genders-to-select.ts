export const mapGendersToSelect = (
	genders?: readonly string[],
): [optionID: string, optionDescription: string][] | undefined =>
	genders?.map(option => [
		option,
		option.toLowerCase().charAt(0).toUpperCase() + option.toLowerCase().slice(1),
	]);
